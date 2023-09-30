import express from "express";
import { verifyToken } from "../VerifyToken.js";
import { createComment, deleteComment, getAllComment, updateComment } from "../Controllers/Comments.js";

const router = express.Router();

// create comment
router.post("/", verifyToken,createComment);

// delete Comment
router.delete("/:commentId", verifyToken,deleteComment);

// update comment
router.put("/:commentId", verifyToken,updateComment);

// get comment
router.get("/:videoId", getAllComment);

export default router;
