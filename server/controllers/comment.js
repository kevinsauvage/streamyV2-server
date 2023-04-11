import makeValidation from '@withvoid/make-validation';

import CommentModel from '../models/comment.js';

const getComments = async (request, response) => {
  try {
    const { movieId } = request.params;
    const { p = 0 } = request.query;
    const comments = await CommentModel.getLastComments(movieId, p);
    return response.status(200).json({ data: comments, success: true });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const addComment = async (request, response) => {
  try {
    const validation = makeValidation((types) => ({
      checks: { content: { type: types.string }, movieId: { type: types.string } },
      payload: request.body,
    }));

    if (!validation.success) return response.status(400).json(validation);
    const { content, movieId } = request.body;
    const comment = await CommentModel.createComment(request.userId, content, movieId);
    return response.status(200).json({ comment, success: true });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const updateComment = async (request, response) => {
  const validation = makeValidation((types) => ({
    checks: { content: { type: types.string } },
    payload: request.body,
  }));
  if (!validation.success) return response.status(400).json(validation);

  const { content } = request.body;

  try {
    const comment = await CommentModel.updateCommentById(content);
    return response.status(200).json({ comment, success: true });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const deleteCommentById = async (request, response) => {
  const user = await CommentModel.deleteByCommentById(request.params.id);
  return response.status(200).json({
    message: `Deleted a count of ${user.deletedCount} comment.`,
    success: true,
  });
};

export default {
  addComment,
  deleteCommentById,
  getComments,
  updateComment,
};
