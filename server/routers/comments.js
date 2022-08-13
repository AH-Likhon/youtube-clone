import express from 'express';
import { addComment } from '../controllers/comment.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.delete('/:id', verifyToken, addComment);
router.get('/:videoId', addComment);

export default router;