const mongoose = require("mongoose");
const {
  createMenuValidator,
  removeMenuValidator,
} = require("../validators/v1/menu");

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
      required: false,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
menuSchema.statics.createValidation = function (body) {
  return createMenuValidator.validate(body, { abortEarly: false });
};
menuSchema.statics.removeValidation = function (body) {
  return removeMenuValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Menu", menuSchema);

module.exports = model;
