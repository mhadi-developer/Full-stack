import express from "express";

import { signUpUser, SignInUser } from "../controllers/user.controller.js";

const app = express();
const router = express.Router();

router.route("/users/signup").post(signUpUser);
router.route("/users/signin").post(SignInUser);

export default router;
