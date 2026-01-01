import express from "express";

import { signUpUser, SignInUser, getLoggedInUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../Middleware/auth.middleware.js";

const app = express();
const router = express.Router();

router.route("/users/signup").post(signUpUser);
router.route("/users/signin").post(SignInUser);
router.route("/users/loggedIn-user").get(isAuthenticated,getLoggedInUser); // protected by isAuthenticated middleware 


export default router;
