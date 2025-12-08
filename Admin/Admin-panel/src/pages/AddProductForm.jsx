import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

// -------------------- ZOD SCHEMA --------------------
const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(10, "Description is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  discount: z.number().min(0).max(90).optional(),
  category: z.string().min(1, "Category is required"),

  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        quantity: z.number().min(1, "Quantity must be greater than 0"),
        price: z.number().min(1, "Price must be greater than 0"),
      })
    )
    .min(1, "Add at least one size"),

  colors: z
    .array(
      z.object({
        color: z.string().min(1, "Color required"),
      })
    )
    .min(1, "Add at least one color"),
});

export default function AddProductForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      sizes: [{ size: "", quantity: 1, price: 0 }],
      colors: [{ color: "" }],
    },
  });

  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const {
    fields: colorFields,
    append: addColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  // ----------------------- MAIN IMAGE -----------------------
  const [mainImage, setMainImage] = useState(null);
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage({ file, url: URL.createObjectURL(file) });
  };
  const removeMainImage = () => setMainImage(null);

  // ----------------------- GALLERY IMAGES -----------------------
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
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  // ----------------------- SUBMIT -----------------------
  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
    console.log("MAIN IMAGE:", mainImage);
    console.log("GALLERY IMAGES:", galleryImages);

    alert("Product submitted. Check console.");
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input type="text" className="form-control" {...register("title")} />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <small className="text-danger">{errors.description.message}</small>
          )}
        </div>

        {/* PRICE + DISCOUNT + CATEGORY */}
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
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              {...register("category")}
            />
            {errors.category && (
              <small className="text-danger">{errors.category.message}</small>
            )}
          </div>
        </div>

        {/* MAIN IMAGE */}
        <div className="mb-4">
          <label className="form-label">Main Product Image</label>
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

        {/* GALLERY IMAGES */}
        <div className="mb-4">
          <label className="form-label">Gallery Images</label>

          <div
            {...getRootProps()}
            className="border border-secondary p-4 rounded text-center bg-light"
            style={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop images, or click to select</p>
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

        {/* SIZES SECTION */}
        <div className="mb-4">
          <label className="form-label">Sizes</label>

          {sizeFields.map((field, index) => (
            <div className="row mb-2" key={field.id}>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Size"
                  className="form-control"
                  {...register(`sizes.${index}.size`)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control"
                  {...register(`sizes.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  {...register(`sizes.${index}.price`, { valueAsNumber: true })}
                />
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeSize(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => addSize({ size: "", quantity: 1, price: 0 })}
          >
            Add Size
          </button>

          {errors.sizes && (
            <small className="text-danger d-block">
              {errors.sizes.message}
            </small>
          )}
        </div>

        {/* COLORS SECTION */}
        <div className="mb-4">
          <label className="form-label">Colors</label>

          {colorFields.map((field, index) => (
            <div className="row mb-2" key={field.id}>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Color"
                  className="form-control"
                  {...register(`colors.${index}.color`)}
                />
              </div>

              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeColor(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => addColor({ color: "" })}
          >
            Add Color
          </button>

          {errors.colors && (
            <small className="text-danger d-block">
              {errors.colors.message}
            </small>
          )}
        </div>

        {/* SUBMIT */}
        <button type="submit" className="btn btn-danger w-100 mt-4">
          Submit Product
        </button>
      </form>
    </div>
  );
}
