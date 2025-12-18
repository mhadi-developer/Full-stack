import express from 'express'
import { getAllProducts,getProductsById,updateProduct,deleteProduct,createProduct } from '../controllers/product.controller.js';
import upload from '../utilities/multerCloudinary.js';
const app = express();
const router = express.Router()


router.route("/products/add").post(
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProduct
);
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductsById);
router.route('/product/update/:id').put(updateProduct);
router.route('/product/delete/:id').delete(deleteProduct);


export default router;
