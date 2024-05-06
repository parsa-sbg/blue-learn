const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    free: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
    },
  },
  { timestamps: true }
);

const model = mongoose.model('Session', schema);

module.exports = model;
