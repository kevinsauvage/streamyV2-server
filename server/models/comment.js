/* eslint-disable func-names */
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  { content: String, movieId: String, userId: String },
  { collection: 'comments', timestamps: true }
);

commentSchema.statics.createComment = async function (userId, content, movieId) {
  this.create({ content, movieId, userId });
};

commentSchema.statics.updateCommentById = async function (id, content) {
  const comment = await this.findByIdAndUpdate({ _id: id }, { content });
  if (!comment) throw new Error('Upate comment failder');
  return comment;
};

commentSchema.statics.getLastComments = async function (id, page) {
  const count = await this.find({ movieId: id });

  const comments = await this.find({ movieId: id })
    .sort({ createdAt: -1 })
    .skip(page * 5)
    .limit(5);

  return { comments, count: count.length };
};

commentSchema.statics.deleteByCommentById = async function (id) {
  this.remove({ _id: id });
};

export default mongoose.model('Comment', commentSchema);
