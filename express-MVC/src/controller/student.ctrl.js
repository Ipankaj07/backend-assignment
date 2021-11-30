const express = require("express");
const Student = require("../models/student.model");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const students = await Student.find().populate("user_id");
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user_id");
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;