import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../others/error.js';

// ----------------------------------- SIGNUP METHOD ----------------------------- //

export const signup = async (req, res, next) => {
    // console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("Registration has been completed successfully!");
    } catch (error) {
        next(error);

    }
};


// ------------------------------------------ SIGNIN METHOD ---------------------- //

export const signin = async (req, res, next) => {
    // console.log(req.body);

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

    res.cookie('access_token', token, {
        httpOnly: true,
    }).status(200).json(others);

    // try {


    // } catch (error) {
    //     next(error);

    // }
};

// ----------------------------------- Google Authentication --------------------- //
export const googleAuth = async (req, res, next) => {
    // try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res.cookie('access_token', token, {
            httpOnly: true,
        }).status(200).json(user._doc);
    } else {
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res.cookie('access_token', token, {
            httpOnly: true,
        }).status(200).json(savedUser._doc);
    }
    // } catch (error) {
    //     next(error);
    // }
}


// ------------------------------------------ LogOut ------------------------------ //
export const logOut = async (req, res, next) => {
    try {
        // console.log(req.user);
        // console.log('Logout completed');
        res.clearCookie('access_token');
        await req.user.save();
    } catch (error) {
        next(error);
    }
}

