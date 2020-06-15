const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    is_complete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
