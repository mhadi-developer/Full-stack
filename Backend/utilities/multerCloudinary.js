// multerCloudinary.js
import multer from "multer";
import  CloudinaryStorage  from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-commerce-store/categories", // folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // accepted file types
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    public_id: (req,res)=> `category-${Date.now()}`
  },
});

// Multer middleware using Cloudinary storage
const upload = multer({ storage });

export default upload;
