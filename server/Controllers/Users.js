import { createError } from "../error.js";
import User from "../Models/User.js";
import Video from "../Models/Video.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } else {
      return next(createError(403, "You can update only your account"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      await User.findByIdAndDelete(req.user.id);

      res.status(200).json("user successfully deleted");
    } else {
      return next(createError(403, "You can delete only your account"));
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const findedUser = await User.findById(req.params.id);
    const { password, ...other } = findedUser._doc;
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.sandId, {
      $inc: { subscribers: 1 },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.sandId },
    });

    res.status(200).json("Subscribed successfully");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.sandId, {
      $inc: { subscribers: -1 },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.sandId },
    });

    res.status(200).json("UnSubscribed successfully");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.sandVideoId;

  try {
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      },
      { new: true }
    );

    res.status(200).json("u made like");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.sandVideoId;

  try {
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: id },
        $pull: { likes: id },
      },
      { new: true }
    );

    res.status(200).json("u made dislike");
  } catch (err) {
    next(err);
  }
};
