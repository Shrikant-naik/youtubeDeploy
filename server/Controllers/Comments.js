import Comment from "../Models/Comment.js";
import Video from "../Models/Video.js";
import { createError } from "../error.js";

export const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ userId: req.user.id, ...req.body });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(createError(404, "comment not found"));

  const video = await Video.findById(req.params.commentId);
  if (!video) return next(createError(404, "video not found"));
  try {
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.commentId);
      res.status(200).json("comment successfully deleted");
    } else {
      return next(createError(403, "you can delete only your comment"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(createError(404, "comment not found"));
  try {
    if (req.user.id === comment.userId) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } else {
      return next(createError(403, "you can update only your comment"));
    }
  } catch (err) {
    next(err);
  }
};

export const getAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({videoId:req.params.videoId});
    res.status(200).json(comments).sort((a,b)=>a.createdAt-b.createdAt);
  } catch (err) {
    next(err);
  }
};
