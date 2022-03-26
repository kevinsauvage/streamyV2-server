import CommentModel from "../models/comment.js";

const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.getLastComments();
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const addComment = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        email: { type: types.string },
        content: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json(validation);

    const { firstName, lastName, email, content } = req.body;

    const comment = await CommentModel.createComment(firstName, lastName, email, content);
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
