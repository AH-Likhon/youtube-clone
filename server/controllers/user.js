import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

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
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// ---------------------------------- SUBSCRIBED USER ---------------------------- //
export const subscribed = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("Subscription successfully updated!");
    } catch (error) {
        next(error);
    }
};

// --------------------------------- UNSUBSCRIBED USER --------------------------- //
export const unSubscribed = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json("Unsubscription successfully updated!");
    } catch (error) {
        next(error);
    }
};

// -------------------------------------- LIKE USER ------------------------------ //
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(200).json('This video has been liked!');
    } catch (error) {
        next(error);
    }
};

// -------------------------------------- DISLIKE USER --------------------------- //
export const disLike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json('This video has been disliked!');
    } catch (error) {
        next(error);
    }
};