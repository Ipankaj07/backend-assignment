require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");


const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/* 
create a signup and a signin route for registering and logging in users
*/

const register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let newErrors = errors.array().map(({ msg, param, location }) => {
      return {
        [param]: msg,
      };
    });
    return res.status(400).json({ errors: newErrors });
  }

  try {
    // check if the email address provided user already exists
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if user exists, return error
    if (user) {
      return res.status(400).json({
        status: "Failed",
        message: "User already exists",
      });
    }

    //else we will create a new user with hashed password
    user = await User.create(req.body);

    // create a new token for the user
    const token = newToken(user);

    //return user and token
    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    //check if the email address provided user already exists
    let user = await User.findOne({ email: req.body.email });

    // if user exists, return error
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address and password",
      });
    }

    //else we will match the user password
    const match = await user.checkPassword(req.body.password);

    // if password does not match, return error
    if (!match) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address and password",
      });
    }

    // if it match then create the token
    const token = newToken(user);

    // return the token and user
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = { register, login };