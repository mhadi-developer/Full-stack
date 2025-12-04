import express from 'express'
import { getAllProducts,getProductsById,updateProduct,deleteProduct,createProduct } from '../controllers/product.controller.js';
const app = express();
const router = express.Router()



router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductsById);
router.route('/product/add').post(createProduct);
router.route('/product/update/:id').put(updateProduct);
router.route('/product/delete/:id').delete(deleteProduct);


export default router;
