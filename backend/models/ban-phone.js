const mongoose = require("mongoose");

const banUserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("BanUser", banUserSchema);

module.exports = model;
