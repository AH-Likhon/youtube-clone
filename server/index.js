import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/users.js";
import videoRouter from "./routers/videos.js";
import commentRouter from "./routers/comments.js";
import authRouter from "./routers/auth.js";

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env)
    .then(() => {
      // console.log("Connected with database");
    })
    .catch((error) => {
      throw error;
    });
};

// <-----------------------------  cors option ----------------------------------> //
const corsOptions = {
  origin: [
    "https://fir-21b25.firebaseapp.com",
    "https://fir-21b25.web.app",
    "http://localhost:3000",
  ],
  // origin: 'http://localhost:3000',
  // origin: 'https://fir-21b25.web.app',
  preflightContinue: true,
  credentials: true,
  optionSuccessStatus: 200,
};
// origin: 'https://fir-21b25.firebaseapp.com',

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);

// handle error middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  // console.log('Connected......');
});
