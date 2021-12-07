require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if it already exists then throw an error
    if (user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide a different email address",
      });

    // else we will create the user we will hash the password as plain text password is harmful
    user = await User.create(req.body);

    // we will create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await User.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // else we match the password
    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // if it matches then create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

/* 
User Data
*/

const getUser = async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
};

const putUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = { register, login, newToken, getUser, putUser };
