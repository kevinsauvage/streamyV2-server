import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    content: String,
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

commentSchema.statics.createComment = async function (content) {
  try {
    const comment = await this.create({ firstName, lastName, email, content });
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

commentSchema.statics.getLastComments = async function () {
  try {
    const comments = await this.find();
    return comments;
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
