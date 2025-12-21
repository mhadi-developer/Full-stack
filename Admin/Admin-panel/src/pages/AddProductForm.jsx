import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import MultiSelect from "react-multi-select-component";
import RichTextEditor from "../components/TipTap-Editor/RichTextEditor.jsx";
  import { ToastContainer, toast } from "react-toastify";
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
  category: z.string().min(1, "Category is required"), // dropdown value (_id or slug)
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
  const [submitloader, setSubmitLoader] = useState(false)
  const mainImageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
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

  // ----------------- Main Image -----------------
  const [mainImage, setMainImage] = useState(null);
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage({ file, url: URL.createObjectURL(file) });
  };
  const removeMainImage = () => {
    if (mainImage?.url) URL.revokeObjectURL(mainImage.url);
    setMainImage(null);
    if (mainImageRef.current) mainImageRef.current.value = "";
  };

  // ----------------- Gallery Images -----------------
  const [galleryImages, setGalleryImages] = useState([]);
  const onDrop = (acceptedFiles) => {
    const mapped = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
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

  // ----------------- Submit Handler -----------------
  const onSubmit = async (data) => {
    const calculatedDiscountPrice =
      data.price && data.discount
        ? data.price - (data.price * data.discount) / 100
        : 0;

    const submitData = { ...data, discountPrice: calculatedDiscountPrice };

    const formData = new FormData();
    formData.append("title", submitData.title);
    formData.append("slug", submitData.slug);
    formData.append("sku", submitData.sku);
    formData.append("shortDescription", submitData.shortDescription);
    formData.append("longDescription", submitData.longDescription);
    formData.append("price", String(submitData.price));
    formData.append("discount", submitData.discount);
    formData.append("discountPrice", submitData.discountPrice);
    formData.append("stock", String(submitData.stock));
    formData.append("category", submitData.category);

    // Sizes and Colors
    submitData.sizes.forEach((item) =>
      formData.append("sizes", JSON.stringify(item))
    );

    submitData.colors.forEach((item) =>
      formData.append("colors", JSON.stringify(item))
    );

    if (submitData.videoLink)
      formData.append("videoLink", submitData.videoLink);
    if (mainImage?.file) formData.append("mainImage", mainImage.file);
    galleryImages.forEach((img) => formData.append("galleryImages", img.file));

    // Send to backend
    const res = await fetch("http://localhost:7000/products/add", {
      method: "POST",
      body: formData,
    });

    
    setSubmitLoader(true);
    
    const result = await res.json();
      toast.success('Product added succeesfully',result.message);
    console.log("Server Response:", result);

    // Debugging: log all FormData entries
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, {
          name: value.name,
          size: value.size,
          type: value.type,
        });
      } else {
        console.log(key, value);
      }
    }

    // Reset
    reset();
    removeMainImage();
    setGalleryImages([]);
    setSubmitLoader(false)
  };

  // ----------------- Cleanup -----------------
  useEffect(() => {
    return () => {
      if (mainImage?.url) URL.revokeObjectURL(mainImage.url);
      galleryImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [mainImage, galleryImages]);



  // Categories data fetching from MongoDB;

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch('http://localhost:7000/categories') 
      const data = await response.json();
      console.log(data);
      setCategories(data);
      
    }
    getAllCategories();
  }, [])
  // categories data set in MongoDB , from Categories form page

  // ----------------- Render -----------------
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

        {/* Slug */}
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input type="text" className="form-control" {...register("slug")} />
          {errors.slug && (
            <small className="text-danger">{errors.slug.message}</small>
          )}
        </div>

        {/* SKU */}
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input type="text" className="form-control" {...register("sku")} />
          {errors.sku && (
            <small className="text-danger">{errors.sku.message}</small>
          )}
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea
            className="form-control"
            {...register("shortDescription")}
          />
          {errors.shortDescription && (
            <small className="text-danger">
              {errors.shortDescription.message}
            </small>
          )}
        </div>

        {/* Long Description */}
        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <Controller
            control={control}
            name="longDescription"
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.longDescription && (
            <small className="text-danger">
              {errors.longDescription.message}
            </small>
          )}
        </div>

        {/* Price & Discount */}
        <div className="row mt-3">
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
            {errors.discount && (
              <small className="text-danger">{errors.discount.message}</small>
            )}
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

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>

          <select className="form-select" {...register("category")}>
            <option value="">Select a category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>

          {errors.category && (
            <small className="text-danger">{errors.category.message}</small>
          )}
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <small className="text-danger">{errors.stock.message}</small>
          )}
        </div>

        {/* Sizes */}
        <div className="mb-3">
          <label className="form-label">Sizes</label>
          <MultiSelect
            className="form-control"
            options={sizeOptions}
            value={selectedSizes}
            onChange={(selected) =>
              setValue("sizes", selected, { shouldValidate: true })
            }
          />
          {errors.sizes && (
            <small className="text-danger">{errors.sizes.message}</small>
          )}
        </div>

        {/* Colors */}
        <div className="mb-3">
          <label className="form-label">Colors</label>
          <MultiSelect
            className="form-control"
            options={colorOptions}
            value={selectedColors}
            onChange={(selected) =>
              setValue("colors", selected, { shouldValidate: true })
            }
          />
          {errors.colors && (
            <small className="text-danger">{errors.colors.message}</small>
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
            name="mainImage"
            type="file"
            className="form-control"
            onChange={handleMainImage}
            ref={mainImageRef}
          />
          {mainImage && (
            <div className="position-relative mt-3" style={{ width: 180 }}>
              <img
                src={mainImage.url}
                alt="preview"
                className="img-fluid border rounded"
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
            <input {...getInputProps({ name: "galleryImages" })} />
            {isDragActive ? (
              <p>Drop images here...</p>
            ) : (
              <p>Drag & drop images or click to select</p>
            )}
          </div>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {galleryImages.map((img) => (
              <div key={img.id} className="position-relative">
                <img
                  src={img.url}
                  alt="gallery"
                  style={{ width: 140, height: 140, objectFit: "cover" }}
                  className="border rounded"
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm position-absolute"
                  style={{ top: 5, right: 5 }}
                  onClick={() => removeGalleryImage(img.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-50 mt-4" disabled={submitloader}>
         {submitloader? 'Submitng...':'Add product'}
        </button>
         <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
             />
      </form>
    </div>
  );
}
