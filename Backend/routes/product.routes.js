import express from 'express'
import { getAllProducts,getProductsById,updateProduct,deleteProduct,createProduct } from '../controllers/product.controller.js';
const app = express();
const router = express.Router()



router.route('/products').get(getAllProducts)
router.route('/product/:name/:age/:profession').get(getProductsById)
router.route('/product/add').post(createProduct);
router.route('/product/update').put(updateProduct)
router.route('/product/delete').delete(deleteProduct)


export default router;
