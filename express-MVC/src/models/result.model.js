const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    marks: { type: Number, required: true, default: 0 },
    evaluation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluation",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("result", resultSchema);
