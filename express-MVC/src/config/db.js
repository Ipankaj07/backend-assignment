const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://ipankaj072:pankaj123@cluster0.hetqe.mongodb.net/evaluation"
  );
};
