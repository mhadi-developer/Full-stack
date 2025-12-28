import express from "express";

import { signUpUser } from "../controllers/user.controller.js";

const app = express();
const router = express.Router();

router.route("/users/signup").post(signUpUser);

export default router;
