import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routers/users.js';
import videoRouter from './routers/videos.js';
import commentRouter from './routers/comments.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
// const cors = require('cors');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// <-----------------------------  cors option ----------------------------------> //
// const corsOptions = {
//     // origin: 'http://localhost:3000',
//     origin: 'https://real-time-chat-web-app.netlify.app',
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

const connectDB = () => {
    mongoose.connect(process.env.DB).then(() => {
        console.log("Connected with database");
    }).catch((error) => {
        throw error;
    });
};

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);


// handle error middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message
    });
})

app.listen(5000, () => {
    connectDB();
    console.log('Connected......');
})