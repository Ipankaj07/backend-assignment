const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.get("", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;