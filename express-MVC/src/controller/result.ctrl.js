const express = require("express");
const Result = require("../models/result.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.get("", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("evaluation_id")
      .populate({
        path: "evaluation_id",
        populate: {
          path: "student_id",
          populate: {
            path: "user_id",
          },
        },
      });
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// get max marks of student in results collection

router.get("/marks", async (req, res) => {
  try {
    const results = await Result.find().sort({ marks: -1 }).lean().exec();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
