import express from "express";
import cors from 'cors';
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routers/users.js';
import videoRouter from './routers/videos.js';
import commentRouter from './routers/comments.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();
// app.use(cors());

// <-----------------------------  cors option ----------------------------------> //
const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: 'https://fir-21b25.firebaseapp.com',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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
});

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log('Connected......');
})