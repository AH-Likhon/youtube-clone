import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';

// -------------------------------- SIGNUP METHOD --------------------------- //

export const signup = async (req, res, next) => {
    // console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User has been created successfully!");
    } catch (error) {
        next(error);

    }
};


// ------------------------------------------ SIGNIN METHOD ---------------------- //

export const signin = async (req, res, next) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return next(createError(404, 'User Not Found'));
        };

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {
            return next(createError(400, 'Invalid password'));
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;

        res
            .cookie('access-token', token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);

    } catch (error) {
        next(error);

    }
}