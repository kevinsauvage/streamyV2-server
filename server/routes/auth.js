import express from "express";
// middlewares
import { encode } from "../middlewares/jwt.js";
//controller
import auth from "../controllers/auth.js";
import { comparePassword } from "../utils/password.js";

const router = express.Router();

router.post("/", encode, auth.login);

export default router;
