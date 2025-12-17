// JSX version (.jsx)
import React, { useRef,useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
  import { ToastContainer, toast } from "react-toastify";

// ---------------- Zod Schema ----------------
const categorySchema = z.object({
  title: z.string().min(1, "Category title is required"),
  isPublic: z.boolean(),
});

export default function AddCategoryForm() {
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      isPublic: true,
    },
  });

  

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const removeImage = () => setImage(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isPublic", data.isPublic);
    if (image) {
      formData.append("image", image);
    }

    console.log("Category Form Data:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      setLoading(true); //loader
  const res = await fetch("http://localhost:7000/category/add", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

      const data = await res.json();
       toast.success('category added succeesfully',res.message);
      console.log("Success:", data);
      setLoading(false); // loader
      reset();
      fileInputRef.current.value = "";

} catch (error) {
      console.error("Request error:", error.message);
      toast.error(`the image is not uploaded.`)
}

   
    
  }
   

  return (
    <div className="container mt-4 mb-5 p-5">
      <h3 className="mb-4">Add New Category</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary p-4 rounded shadow"
        encType="multipart/form-data"
      >
        {/* CATEGORY TITLE */}
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category title"
            {...register("title")}
          />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            ref={(e) => {
              register("image").ref(e);
              fileInputRef.current = e;
            }}
        
          />

          {image && (
            <div className="position-relative mt-3" style={{ width: "180px" }}>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="img-fluid rounded border"
              />
              <button
                type="button"
                className="btn btn-sm btn-primary position-absolute"
                style={{ top: "5px", right: "5px" }}
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* PUBLIC / PRIVATE */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublic"
            {...register("isPublic")}
          />
          <label className="form-check-label" htmlFor="isPublic">
            Public Category
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Saving" : "Add Category"}
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
