const mongoose = require("mongoose");
const {
  createContactValidator,
  answerValidator,
  removeValidator,
} = require("../validators/v1/contact");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
contactSchema.statics.createValidation = function (body) {
  return createContactValidator.validate(body, { abortEarly: false });
};
contactSchema.statics.answerValidation = function (body) {
  return answerValidator.validate(body, { abortEarly: false });
};
contactSchema.statics.removeValidation = function (body) {
  return removeValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Contact", contactSchema);

module.exports = model;
