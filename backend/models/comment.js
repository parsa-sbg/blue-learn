const mongoose = require("mongoose");
const {
  createCommentValidator,
  answerCommentValidator,
  commentIdValidator,
} = require("../validators/v1/comment");

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    answer: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    mainCommendID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
commentSchema.statics.createValidation = function (body) {
  return createCommentValidator.validate(body, { abortEarly: false });
};
commentSchema.statics.answerValidation = function (body) {
  return answerCommentValidator.validate(body, { abortEarly: false });
};
commentSchema.statics.commentIdValidation = function (body) {
  return commentIdValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Comment", commentSchema);

module.exports = model;
