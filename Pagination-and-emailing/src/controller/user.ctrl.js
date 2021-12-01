const express = require("express");

const sendMail = require("../utils/send-mail");

const router = express.Router();

const User = require("../model/user.model");

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const to_array = ["a@a.com", "b@b.com", "c@c,com", "d@d.com", "e@e.com"];

    const to_string = to_array.join(",");

    sendMail(
      "A@A.com",
      req.body.email,
      `Welcome to Linux System ${req.body.first_name} ${req.body.last_name}`,
      `Hi ${req.body.first_name}, Please confirm your email address.
      Your OTP is ${Math.floor(1000 + Math.random() * 9000)}`,
      `<h3>Hi ${req.body.first_name}, Please confirm your email address.
      Your OTP is ${Math.floor(1000 + Math.random() * 9000)}</h3>`
    );

    sendMail(
      "A@A.com",
      to_string,
      `A New User ${req.body.first_name} ${req.body.last_name} has reistered with us.`,
      `Please Welcome ${req.body.first_name} ${req.body.last_name}`,
      `<h3>Please Welcome ${req.body.first_name} ${req.body.last_name}.</h3>`
    );

    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    const skip = (page - 1) * size;

    // page = 1 skip(0) limit(5) // (1-1) * 5  = 0

    const users = await User.find().skip(skip).limit(size).lean().exec();

    const totalPages = Math.ceil((await User.countDocuments().exec()) / size);

    return res.status(200).json({ users, totalPages });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
