import { createError } from "../error.js";
import User from "../models/User.js";

// ------------------------------------- UPDATE USER ----------------------------- //

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateUser);
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    };
};


// ------------------------------------- DELETE USER ----------------------------- //

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted!');
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    };
};

// ---------------------------------------- GET USER ----------------------------- //
export const getUser = async (req, res, next) => { };

// ---------------------------------- SUBSCRIBED USER ---------------------------- //
export const subscribed = async (req, res, next) => { };

// --------------------------------- UNSUBSCRIBED USER --------------------------- //
export const unSubscribed = async (req, res, next) => { };

// -------------------------------------- LIKE USER ------------------------------ //
export const like = async (req, res, next) => { };

// --------------------------------------- UNLIKE USER --------------------------- //
export const disLike = async (req, res, next) => { };