import express from 'express'
const app = express();
import {
  addProductToCart,
  getAllCartItemsByUser,
  updateItemById,
  deleteItemById,
  getSingleItemFromCart,
} from "../controllers/cart.controller.js";
const router = express.Router()



router.route("/cart/add/:userId").post(addProductToCart);
router.route("/cart/items/:userId").get(getAllCartItemsByUser);
router.route("/cart/item/:id").get(getSingleItemFromCart);
router.route("/cart/update/:id/:type").put(updateItemById);
router.route("/cart/delete/:id").delete(deleteItemById);





export default router;
