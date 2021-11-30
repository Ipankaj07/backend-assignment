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
      })
      .lean()
      .exec();
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

// the student with his personal details who scored the highest mark in the evaluation

router.get("/marks", async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ marks: -1 })
      .limit(3)
      .populate("evaluation_id")
      .populate({
        path: "evaluation_id",
        populate: {
          path: "student_id",
          populate: {
            path: "user_id",
          },
        },
      })
      .lean()
      .exec();
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
