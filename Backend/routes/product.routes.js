import express from 'express'
import { getAllProducts,getProductsBySlug,updateProduct,deleteProduct,createProduct } from '../controllers/product.controller.js';
import upload from '../utilities/multerCloudinary.js';
import { isAuthenticated } from '../Middleware/auth.middleware.js';
const app = express();
const router = express.Router()


router.route("/products/add").post(isAuthenticated,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
  ]),
  createProduct
);
router.route("/products").get(getAllProducts);
router.route("/product/:slug").get( getProductsBySlug);
router.route("/product/update/:id").put(isAuthenticated, updateProduct);
router.route("/product/delete/:id").delete(isAuthenticated, deleteProduct);


export default router;
