const mongoose = require("mongoose");
const { articleValidator } = require("../validators/v1/article");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },

    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    publish: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
articleSchema.statics.validation = function (body) {
  return articleValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Article", articleSchema);

module.exports = model;
