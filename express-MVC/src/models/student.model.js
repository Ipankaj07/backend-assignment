const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    roll_id: { type: String, required: true },
    current_batch: { type: String, required: false, default: "web-12" },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);