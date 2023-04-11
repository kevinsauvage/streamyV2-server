import express from 'express';

import comment from '../controllers/comment.js';

const router = express.Router();

router.get('/:movieId', comment.getComments);

router.post('/', comment.addComment);

router.put('/:commentId', comment.updateComment);

router.delete('/:commentId', comment.deleteCommentById);

export default router;
