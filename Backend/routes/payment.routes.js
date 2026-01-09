import { isAuthenticated } from "../Middleware/auth.middleware.js";
import { stripePayment } from "../controllers/payment.controller.js";

const app = express();
const router = express.Router();

router.route("/payment/checkout/sessions").post(stripePayment);