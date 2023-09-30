import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "you are not authenticated"));

  jwt.verify(token, "123456789!@#$%^&*(", (err, data) => {
    if (err) return next(createError(403, "token is not valid "));

    req.user = data;

    next();
  });
};
