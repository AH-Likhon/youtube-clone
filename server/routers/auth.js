import express from 'express';
import { googleAuth, logOut, signin, signup } from '../controllers/auth.js';
import { verifyToken } from '../others/verifyToken.js';

const router = express.Router();

// CREATE A USER
router.post('/signup', signup);

// SIGN IN
router.post('/signin', signin);

// GOOGLE AUTHENTICATION
router.post('/google', googleAuth);

// LogOut
router.get('/logOut', verifyToken, logOut);

export default router;