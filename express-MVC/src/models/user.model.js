const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    gender: { type: String, required: true },
    date_of_birth: { type: String, required: false, default: "01/01/2002" },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
