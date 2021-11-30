const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    date_of_evaluation: {
      type: String,
      required: true,
      default: "25/12/2021",
    },
    instructor: { type: String, required: false, default: "Dhaval Chheda" },
    topic_name: { type: String, required: false, default: "mongoDB" },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    attendence: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("evaluation", evaluationSchema);
