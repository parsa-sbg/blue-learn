const mongoose = require("mongoose");
const { getOneValidator } = require("../validators/v1/order");

const courseUserSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics

courseUserSchema.statics.getOneValidation = function (body) {
  return getOneValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("CourseUser", courseUserSchema);

module.exports = model;
