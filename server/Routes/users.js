import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../Controllers/Users.js";

import { verifyToken } from "../VerifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

// get user
router.get("/find/:id", getUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// subscribe user
router.put("/sub/:sandId", verifyToken, subscribe);

// unsubscribe user
router.put("/unsub/:sandId", verifyToken, unsubscribe);

// like a video
router.put("/like/:sandVideoId", verifyToken, like);

// dislike a video
router.put("/dislike/:sandVideoId", verifyToken, dislike);

export default router;
