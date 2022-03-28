import makeValidation from "@withvoid/make-validation";
import CommentModel from "../models/comment.js";

const getComments = async (req, res) => {
  try {
    const { movieId } = req.params;

    const { p } = req.query;

    const page = p ? p : 0;

    const comments = await CommentModel.getLastComments(movieId, page);

    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const addComment = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        content: { type: types.string },
        movieId: { type: types.string },
      },
    }));

    if (!validation.success) return res.status(400).json(validation);

    const { content, movieId } = req.body;

    const comment = await CommentModel.createComment(req.userId, content, movieId);
    return res.status(200).json({ success: true, comment });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const updateComment = async (req, res) => {
  const validation = makeValidation((types) => ({
    payload: req.body,
    checks: {
      content: { type: types.string },
    },
  }));
  if (!validation.success) return res.status(400).json(validation);

  const { content } = req.body;

  try {
    const comment = await CommentModel.updateCommentById(content);
    return res.status(200).json({ success: true, comment });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const deleteCommentById = async (req, res) => {
  const user = await CommentModel.deleteByCommentById(req.params.id);
  return res.status(200).json({
    success: true,
    message: `Deleted a count of ${user.deletedCount} comment.`,
  });
};

export default {
  getComments,
  addComment,
  updateComment,
  deleteCommentById,
};
