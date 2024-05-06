const mongoose = require("mongoose");
const {
  createCourseValidator,
  getRelatedValidator,
  getSessionInfoValidator,
  removeSessionValidator,
  removeCourseValidator,
  getCategoryCoursesValidator,
  registerValidator,
  createSessionValidator,
  getOneValidator,
  updateCourseValidator,
} = require("../validators/v1/course");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    support: {
      type: String,
      required: false,
    },
    shortName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isComplete: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

courseSchema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

courseSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

//* add yup validation method to mongoose statics
courseSchema.statics.createValidation = function (body) {
  return createCourseValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.updateValidation = function (body) {
  return updateCourseValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.getOneValidation = function (body) {
  return getOneValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.createSessionValidation = function (body) {
  return createSessionValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.registerValidation = function (body) {
  return registerValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.getCategoryCoursesValidation = function (body) {
  return getCategoryCoursesValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.removeCourseValidation = function (body) {
  return removeCourseValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.removeSessionValidation = function (body) {
  return removeSessionValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.getSessionInfoValidation = function (body) {
  return getSessionInfoValidator.validate(body, { abortEarly: false });
};
courseSchema.statics.getRelatedValidation = function (body) {
  return getRelatedValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Course", courseSchema);

module.exports = model;
