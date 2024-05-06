const mongoose = require("mongoose");
const {
  getOneOffValidator,
  createOffValidator,
  removeOffValidator,
  setDiscountOnAllValidator,
} = require("../validators/v1/off");

const offSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
offSchema.statics.getOneValidation = function (body) {
  return getOneOffValidator.validate(body, { abortEarly: false });
};
offSchema.statics.createValidation = function (body) {
  return createOffValidator.validate(body, { abortEarly: false });
};
offSchema.statics.removeValidation = function (body) {
  return removeOffValidator.validate(body, { abortEarly: false });
};
offSchema.statics.setAllValidation = function (body) {
  return setDiscountOnAllValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Off", offSchema);

module.exports = model;
