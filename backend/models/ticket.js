const mongoose = require("mongoose");
const {
  getAnswerValidator,
  createTicketValidator,
  departmentsSubsValidator,
  setAnswerValidator,
} = require("../validators/v1/ticket");

const ticketSchema = new mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    departmentSubID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "DepartmentSub",
    },
    priority: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    answer: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Ticket",
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Course",
      default: "634e6b0e1d5142b91afa9bb3",
    },
    isAnswer: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
ticketSchema.statics.createValidation = function (body) {
  return createTicketValidator.validate(body, { abortEarly: false });
};
ticketSchema.statics.getAnswerValidation = function (body) {
  return getAnswerValidator.validate(body, { abortEarly: false });
};
ticketSchema.statics.setAnswerValidation = function (body) {
  return setAnswerValidator.validate(body, { abortEarly: false });
};
ticketSchema.statics.departmentsSubsValidation = function (body) {
  return departmentsSubsValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Ticket", ticketSchema);

module.exports = model;
