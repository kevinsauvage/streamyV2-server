import express from "express";
// controllers
import user from "../controllers/user.js";

const router = express.Router();

router.get("/", user.getAllUsers);

router.post("/", user.createUser);

router.put("/:id", user.updateUserById);

router.get("/:id", user.getUserById);

router.delete("/:id", user.deleteUserById);

export default router;
