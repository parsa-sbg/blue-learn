const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Info", schema);

module.exports = model;
