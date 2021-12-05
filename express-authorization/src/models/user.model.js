const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // timestamps: { type: Number, default: Date.now() },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, same) => {
      if (err) return reject(err);
      return resolve(same);
    });
  });
};

module.exports = model("user", userSchema);
