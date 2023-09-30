import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./Routes/users.js";
import authRoute from "./Routes/auth.js";
import videoRoute from "./Routes/videos.js";
import commentRoute from "./Routes/comments.js";

const app = express();
dotenv.config();

// he 3 gisti and samesite and withcredentials

app.use(express.json());
app.use(
  cors({
    origin: "https://youtube-deploy.vercel.app", // Replace with your frontend's URL

    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());

const connect = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const port = process.env.PORT || 8800;


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, async () => {
  await connect();
  console.log("Connected to Server");
});
