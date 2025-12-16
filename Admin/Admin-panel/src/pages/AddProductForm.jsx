import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import MultiSelect from "react-multi-select-component";
import "../pages/DropDownZone.css";
import RichTextEditor from "../components/TipTap-Editor/RichTextEditor.jsx";

// -------------------- ZOD SCHEMA --------------------
const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  slug: z.string().min(1, "Slug is required"),
  sku: z.string().min(1, "SKU is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  longDescription: z
    .string()
    .refine(
      (val) => val.replace(/<[^>]+>/g, "").trim().length >= 10,
      "Long description is required"
    ),
  price: z.number().min(1, "Price must be greater than 0"),
  discount: z.number().min(0).max(90).optional(),
  discountPrice: z.number().optional(),
  category: z.string().min(1, "Category is required"),
  stock: z.number().min(0, "Stock must be valid"),
  sizes: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "Select at least one size"),
  colors: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "Select at least one color"),
  videoLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      slug: "",
      sku: "",
      shortDescription: "",
      longDescription: "",
      price: 0,
      discount: 0,
      discountPrice: 0,
      category: "",
      stock: 0,
      sizes: [],
      colors: [],
      videoLink: "",
    },
  });

  const selectedSizes = watch("sizes");
  const selectedColors = watch("colors");
  const price = watch("price");
  const discount = watch("discount");
  const discountPrice =
    price && discount ? price - (price * discount) / 100 : 0;

  // Main Image
  const [mainImage, setMainImage] = useState(null);
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file)
      setMainImage({ file, url: URL.createObjectURL(file), name: file.name });
  };
  const removeMainImage = () => {
    if (mainImage?.url) URL.revokeObjectURL(mainImage.url);
    setMainImage(null);
  };

  // Gallery Images
  const [galleryImages, setGalleryImages] = useState([]);
  const onDrop = (acceptedFiles) => {
    const mapped = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setGalleryImages((prev) => [...prev, ...mapped]);
  };
  const removeGalleryImage = (id) => {
    setGalleryImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return prev.filter((img) => img.id !== id);
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const sizeOptions = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];

  const colorOptions = [
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("sku", data.sku);
    formData.append("shortDescription", data.shortDescription);
    formData.append("longDescription", data.longDescription);

    formData.append("price", String(data.price));
    formData.append("discount", String(data.discount ?? 0));
    formData.append(
      "discountPrice",
      String(data.discountPrice ?? discountPrice)
    );
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);

    (data.sizes || []).forEach((item, index) =>
      formData.append(`sizes[${index}]`, item.value)
    );
    (data.colors || []).forEach((item, index) =>
      formData.append(`colors[${index}]`, item.value)
    );
    if (data.videoLink) formData.append("videoLink", data.videoLink);

    if (mainImage?.file) formData.append("mainImage", mainImage.file);
    galleryImages.forEach((img, index) =>
      formData.append(`galleryImages[${index}]`, img.file)
    );

    console.log("FORM DATA:", data);
    for (const pair of formData.entries()) console.log(pair[0], pair[1]);
    console.log('form submitted successfully');
    
  };

  useEffect(() => {
    return () => {
      if (mainImage?.url) URL.revokeObjectURL(mainImage.url);
      galleryImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [mainImage, galleryImages]);

  return (
    <div className="container bg-secondary mt-4 mb-5 py-5 px-5">
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input type="text" className="form-control" {...register("title")} />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* Long Description with RichTextEditor */}
        <label className="form-label mt-3">Long Description</label>
        <Controller
          control={control}
          name="longDescription"
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.longDescription}
            />
          )}
        />

        {/* Price, Discount, Discount Price */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <small className="text-danger">{errors.price.message}</small>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              className="form-control"
              {...register("discount", { valueAsNumber: true })}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Discount Price</label>
            <input
              type="number"
              className="form-control"
              value={discountPrice}
              readOnly
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-3">
          <label className="form-label">Sizes</label>
          <MultiSelect
            options={sizeOptions}
            value={selectedSizes}
            className="bg-secondary"
            onChange={(selected) =>
              setValue("sizes", selected, { shouldValidate: true })
            }
            labelledBy="Select Sizes"
            overrideStrings={{ selectSomeItems: "Select sizes..." }}
          />
          {errors.sizes && (
            <small className="text-danger d-block">
              {errors.sizes.message}
            </small>
          )}
        </div>

        {/* Colors */}
        <div className="mb-3">
          <label className="form-label">Colors</label>
          <MultiSelect
            options={colorOptions}
            value={selectedColors}
            onChange={(selected) =>
              setValue("colors", selected, { shouldValidate: true })
            }
            labelledBy="Select Colors"
            overrideStrings={{ selectSomeItems: "Select colors..." }}
          />
          {errors.colors && (
            <small className="text-danger d-block">
              {errors.colors.message}
            </small>
          )}
        </div>

        {/* Video Link */}
        <div className="mb-3">
          <label className="form-label">Video Link (Optional)</label>
          <input
            type="text"
            className="form-control"
            {...register("videoLink")}
          />
          {errors.videoLink && (
            <small className="text-danger">{errors.videoLink.message}</small>
          )}
        </div>

        {/* Main Image */}
        <div className="mb-3">
          <label className="form-label">Main Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleMainImage}
          />
          {mainImage && (
            <div className="position-relative mt-3" style={{ width: "180px" }}>
              <img
                src={mainImage.url}
                className="img-fluid border rounded"
                alt="preview"
              />
              <button
                type="button"
                className="btn btn-danger btn-sm position-absolute"
                style={{ top: 5, right: 5 }}
                onClick={removeMainImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div className="mb-3">
          <label className="form-label">Gallery Images</label>
          <div
            {...getRootProps()}
            className={`border p-4 rounded text-center ${
              isDragActive
                ? "bg-light border-primary"
                : "bg-light border-secondary"
            }`}
            style={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop images here...</p>
            ) : (
              <p>Drag & drop images, or click to select</p>
            )}
          </div>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {galleryImages.map((img) => (
              <div key={img.id} className="position-relative">
                <img
                  src={img.url}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                  className="border rounded"
                  alt="gallery"
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute"
                  style={{ top: 5, right: 5 }}
                  onClick={() => removeGalleryImage(img.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-danger w-100 mt-4">
          Submit Product
        </button>
      </form>
    </div>
  );
}
