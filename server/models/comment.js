import mongoose from "mongoose";
const { ObjectId } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    userId: String,
    content: String,
    movieId: String,
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

commentSchema.statics.createComment = async function (userId, content, movieId) {
  try {
    const comment = await this.create({ userId, content, movieId });

    return comment;
  } catch (error) {
    throw error;
  }
};

commentSchema.statics.updateCommentById = async function (id, content) {
  try {
    const comment = await this.findByIdAndUpdate({ _id: id }, { content: content });
    if (!comment) throw { error: "Upate comment failder" };
    return comment;
  } catch (error) {
    throw error;
  }
};

commentSchema.statics.getLastComments = async function (id, page) {
  try {
    const count = await this.find({ movieId: id });

    const docs = await this.find({ movieId: id })
      .sort({ createdAt: -1 })
      .skip(page * 5)
      .limit(5);

    return { comments: docs, count: count.length };
  } catch (error) {
    throw error;
  }
};

commentSchema.statics.deleteByCommentById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("Comment", commentSchema);
