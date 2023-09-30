import express from "express";
import {
  createVideo,
  deleteVideo,
  getVideo,
  random,
  search,
  subscribedVideo,
  tags,
  trend,
  updateVideo,
  view,
} from "../Controllers/Videos.js";
import { verifyToken } from "../VerifyToken.js";

const router = express.Router();

// create Video
router.post("/", verifyToken, createVideo);

// update video
router.put("/:videoId", verifyToken, updateVideo);

// get a video
router.get("/find/:videoId", getVideo);

// delete a video
router.delete("/:videoId", verifyToken, deleteVideo);

// Increase a view of a video
router.put("/view/:videoId", view); // verifyToen required?

// get a treanding video
router.get("/trend", trend);

// get a random video
router.get("/random", random);

// get a subscribed videos
router.get("/sub", verifyToken, subscribedVideo);

// get videos by tags
router.get("/tags", tags);

// get videos by search
router.get("/search", search);

export default router;
