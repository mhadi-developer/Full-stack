import express from "express"
import { isAuthenticated } from "../Middleware/auth.middleware.js";
import { stripePayment , confirmOrder } from "../controllers/payment.controller.js";

const app = express();
const router = express.Router();

router.route("/payment/checkout/sessions").post( isAuthenticated,stripePayment);
router.route("/order/confirm").post( confirmOrder);




export default router;