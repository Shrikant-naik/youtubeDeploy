import Video from "../Models/Video.js";
import User from "../Models/User.js";
import { createError } from "../error.js";

export const createVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const findVideo = await Video.findById(req.params.videoId);
    if (!findVideo) return next(createError(404, "video not found"));

    if (req.user.id === findVideo.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedVideo);
    } else {
      next(createError(403, "You can update only your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const findVideo = await Video.findById(req.params.videoId);
    if (!findVideo) return next(createError(404, "video not found"));

    if (req.user.id === findVideo.userId) {
      await Video.findByIdAndDelete(req.params.videoId);

      res.status(200).json("video has been deleted successfully");
    } else {
      next(createError(403, "You can delete only your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const view = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(
      req.params.videoId,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json("view get increased");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const subscribedVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const tags = async (req, res, next) => {
  const tag = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tag } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.search;

  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
