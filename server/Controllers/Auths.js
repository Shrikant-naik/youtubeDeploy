import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({ ...req.body, password: hash });
  try {
    await newUser.save();
    res.status(200).json("user has been created successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
    });
    if (!user) return next(createError(404, "user not found"));

    const cheaKPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!cheaKPassword)
      return next(createError(400, "wrong password or username"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...sendUser } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(sendUser);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
       
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });

      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
