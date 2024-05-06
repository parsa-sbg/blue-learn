const mongoose = require("mongoose");
const { registerValidator, loginValidator } = require("../validators/v1/auth");
const {
  removeUserValidator,
  banUserValidator,
  updateUserValidator,
  changeUserRoleValidator,
  editUserValidator,
} = require("../validators/v1/user");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
//* auth
userSchema.statics.registerValidation = function (body) {
  return registerValidator.validate(body, { abortEarly: false });
};
userSchema.statics.loginValidation = function (body) {
  return loginValidator.validate(body, { abortEarly: false });
};

//* panel
userSchema.statics.removeUserValidation = function (body) {
  return removeUserValidator.validate(body, { abortEarly: false });
};
userSchema.statics.banUserValidation = function (body) {
  return banUserValidator.validate(body, { abortEarly: false });
};
userSchema.statics.updateUserValidation = function (body) {
  return updateUserValidator.validate(body, { abortEarly: false });
};
userSchema.statics.changeUserRoleValidation = function (body) {
  return changeUserRoleValidator.validate(body, { abortEarly: false });
};
userSchema.statics.editUserValidation = function (body) {
  return editUserValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("User", userSchema);

module.exports = model;
