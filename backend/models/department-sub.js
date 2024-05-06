const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      ref: "Course",
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("DepartmentSub", schema);

module.exports = model;
