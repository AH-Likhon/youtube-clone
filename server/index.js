import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();


const connectDB = () => {
    mongoose.connect(process.env.DB).then(() => {
        console.log("Connected with databse");
    }).catch((error) => {
        throw error;
    });
}

app.listen(5000, () => {
    connectDB();
    console.log('Connected......');
})