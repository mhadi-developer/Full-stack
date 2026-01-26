/**
 * Product Controller
 * ------------------
 * Handles all product-related CRUD operations.
 */

import ProductModal from "../Modals/Product-modal/product-modal.js";
import multer from "multer";
import path from "path";
import productModal from "../Modals/Product-modal/product-modal.js";

/* =========================================================
   GET ALL PRODUCTS
   Fetch products with pagination support
========================================================= */
export const getAllProducts = async (req, res) => {
  try {
    // Page and limit from query params (default: page 1, limit 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await productModal.find({}).skip(skip).limit(limit);
    console.log("products---------->",products);
    
    console.log("produvts lenght ---->", products.length);
    

    // Total products count
    const totalProducts = await productModal.countDocuments();

    res.status(200).json({
      products,
      hasMore: skip+products.length < totalProducts,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "failed to fetch products",
    });
  }
}; // fetch all products from database

/* =========================================================
   GET PRODUCT BY ID
   Fetch a single product using its ID
========================================================= */
export const getProductsById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModal.findById(id);

  res.json({
    message: "single product endpoint called",
    product,
  });
}; // fetch single product by id from database

/* =========================================================
   GET PRODUCT BY SLUG
   Fetch a single product using slug
========================================================= */
export const getProductsBySlug = async (req, res) => {
  const { slug } = req.params;

  const product = await ProductModal.find({ slug });

  res.json({
    message: "single product endpoint called",
    product,
  });
}; // fetch single product by slug from database

/* =========================================================
   UPDATE PRODUCT
   Update product data using product ID
========================================================= */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await ProductModal.findByIdAndUpdate(id, data);

  res.json({
    message: `product with id ${id} is updated`,
    data: data,
  });
}; // update product by id in database

/* =========================================================
   DELETE PRODUCT
   Delete product using product ID
========================================================= */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await ProductModal.findByIdAndDelete(id);

  res.json({
    message: `product with id ${id} is deleted`,
  });
}; // delete product by id in database

/* =========================================================
   CREATE PRODUCT
   Create a new product with images, sizes, and colors
========================================================= */
export const createProduct = async (req, res) => {
  const productData = req.body;

  // Parse sizes and colors if provided
  const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

  productData.sizes = sizes;
  productData.colors = colors;

  // Extract uploaded images
  const images = req.files;

  // Main product image
  const mainImage = {
    public_id: images.mainImage[0].filename,
    secure_url: images.mainImage[0].path,
  };

  // Gallery images
  const galleryImages = images.galleryImages.map((galleryImg) => {
    return {
      public_id: galleryImg.filename,
      secure_url: galleryImg.path,
    };
  });
  // galleryImg object generated from galleryImages array

  console.log("backend received data ****************", productData);
  console.log("******** images", images);

  // Attach images to product data
  productData.mainImage = mainImage;
  productData.galleryImages = galleryImages;

  // Save product
  await ProductModal.create(productData);

  res.status(201).json({
    message: "product created",
    data: productData,
    success: true,
  });
};

/* =========================================================
   GET PRODUCTS BY CATEGORY
   Fetch products belonging to a specific category
========================================================= */
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params;

    const productsByCategory = await productModal.find({
      category: cat_id,
    });

    console.log("products fetched by category -->", productsByCategory);

    res.status(200).json({
      data: productsByCategory,
      message: "products fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong",
    });
  }
};
