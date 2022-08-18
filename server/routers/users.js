import express from 'express';
import { deleteUser, disLike, getUser, like, subscribed, unSubscribed, updateUser } from '../controllers/user.js';
import { verifyToken } from '../others/verifyToken.js';

const router = express.Router();

// ------------------------------------- UPDATE USER ----------------------------- //
router.put('/:id', verifyToken, updateUser);

// ------------------------------------- DELETE USER ----------------------------- //
router.delete('/:id', verifyToken, deleteUser);

// -------------------------------------- GET A USER ----------------------------- //
router.get('/find/:id', getUser);

// --------------------------------- SUBSCRIBED A USER --------------------------- //
router.put('/sub/:id', verifyToken, subscribed);

// --------------------------------- UNSUBSCRIBED A USER ------------------------- //
router.put('/unsub/:id', verifyToken, unSubscribed);

// -------------------------------------- LIKE A VIDEO --------------------------- //
router.put('/like/:videoId', verifyToken, like);

// ------------------------------------ DISLIKE A VIDEO -------------------------- //
router.put('/dislike/:videoId', verifyToken, disLike);

export default router;