const mongoose = require("mongoose");
const { seeNotificationValidator } = require("../validators/v1/notification");

const notificationSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    see: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//* add yup validation method to mongoose statics
notificationSchema.statics.seeValidation = function (body) {
  return seeNotificationValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Notification", notificationSchema);

module.exports = model;
