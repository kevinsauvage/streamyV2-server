import express from "express";
// middlewares
import { encode } from "../middlewares/jwt.js";
//controller
import auth from "../controllers/auth.js";
import user from "../controllers/user.js";

const router = express.Router();

router.post("/login", encode, auth.login);

router.post("/register", user.createUser);

export default router;
