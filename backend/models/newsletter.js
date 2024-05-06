const mongoose = require("mongoose");
const { createNewsletterValidator } = require("../validators/v1/newsletter");

const newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
newsLetterSchema.statics.createValidation = function (body) {
  return createNewsletterValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("NewsLetter", newsLetterSchema);

module.exports = model;
