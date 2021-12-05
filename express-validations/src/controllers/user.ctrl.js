const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model.js");

const router = express.Router();

router.post(
  "/",
  body("first_name")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name is required and minimum be in 3 characters"),
  body("last_name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name is required and minimum be in 3 characters"),
  body("email").custom(async (value) => {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(value);
    const listOfDmains = [
      "masai.school",
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "ymail.com",
      "mail.com",
    ];
    const email = value.split("@");
    const domain = email[1];
    if (!listOfDmains.includes(domain)) {
      throw new Error("we do not support this domain");
    }
    if (!isEmail) {
      throw new Error("Please enter a valid email address");
    }
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("Email already exists");
    }
    return true;
  }),
  body("pincode")
    // .isNumeric()
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be 6 digits"),
  body("age").custom((value) => {
    const isAge = /^[0-9]*$/.test(value);
    if (!isAge) {
      throw new Error("Age not be in negative or you put invalid formate");
    } else if (value < 1 || value > 100) {
      throw new Error("Age must be between 1 and 100");
    }
    return true;
  }),
  body("gender").custom((value) => {
    const isGender = /^male$|^female$|^others/gim.test(value);
    if (!isGender) {
      throw new Error("Please enter valid gender");
    }
    return true;
  }),
  async (req, res) => {
    // console.log(body("name"));
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
      const user = new User(req.body);
      await user.save();

      return res.status(201).json({ user });
    } catch (e) {
      return res.status(500).json({ Status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (e) {
    return res.status(500).json({ Status: "failed", message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ Status: "failed", message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ Status: "failed", message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ Status: "failed", message: e.message });
  }
});

module.exports = router;
