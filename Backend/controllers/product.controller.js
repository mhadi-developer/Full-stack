import ProductModal from "../Modals/Product-modal/product-modal.js";
import multer from "multer";
import path from "path";
import productModal from "../Modals/Product-modal/product-modal.js";







export const getAllProducts = async (req, res) => {
  try {

    // page and limit in query from client side (default 1 , 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // fetching all products with pagination

    const products = await productModal.find({}).skip(skip).limit(limit);

    // total products/ documents in DB

    const totalProducts = await productModal.countDocuments();

    res.status(200).json({
      products,
      hasMore: skip + products.lenght < totalProducts,
      currentPage: page
    });

  } catch (error) {
    
    res.status(500).json({
      message: error.message || " failed to fetch products"
    })
  }
}; // fetch all products from database

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModal.findById(id);

  res.json({
    message: "single product endpoint called",
    product,
  });
}; // fetch single product by id from database

export const getProductsBySlug = async (req, res) => {
  const { slug } = req.params;
  const product = await ProductModal.find({ slug });

  res.json({
    message: "single product endpoint called",
    product,
  });
}; // fetch single product by slug from database

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await ProductModal.findByIdAndUpdate(id, data);
  res.json({
    message: `product with id ${id} is updated`,
    data: data,
  });
}; // update product by id in database

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductModal.findByIdAndDelete(id);
  res.json({ message: `product with id ${id} is deleted` });
}; // delete product by id in database


export const createProduct = async (req, res) => {
  const productData = req.body;


  
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
  
  productData.sizes = sizes;
  productData.colors = colors;
  const images = req.files;
  const mainImage = {
    public_id: images.mainImage[0].filename,
    secure_url : images.mainImage[0].path
  }


  const galleryImages = images.galleryImages.map((galleryImg) => {
    return {
      public_id: galleryImg.filename,
      secure_url : galleryImg.path
    }
})
// gallerImg object from the array of galleryImages array of objects 


  console.log("backend recievd data ****************", productData);
  console.log("********images", images);
  
  productData.mainImage = mainImage;
  productData.galleryImages = galleryImages;


  await ProductModal.create(productData);
  


  res.status(201).json({message: "product created ", data: productData, success:true})
  
}
  