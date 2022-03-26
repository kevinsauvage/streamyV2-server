import express from "express";
// controllers
import comment from "../controllers/comment.js";

const router = express.Router();

router.get("/", comment.getComments);

router.post("/", comment.addComment);

router.put("/:commentId", comment.updateComment);

router.delete("/:commentId", comment.deleteCommentById);

export default router;
