const express = require("express");
const Evaluation = require("../models/evaluation.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const evaluation = await Evaluation.create(req.body);
    res.status(200).json({
      success: true,
      data: evaluation,
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
    const evaluations = await Evaluation.find()
      .populate("student_id")
      // .populate({ path: "student_id",
      // populate: {
      //     path: "user_id"}})
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      data: evaluations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//student who persent in evalution

router.get("/persentstudent", async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ attendence: { $eq: true } })
      .populate("student_id")
      .populate({
        path: "student_id",
        populate: {
          path: "user_id",
        },
      })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      data: evaluations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const evaluations = await Evaluation.findById(req.params.id);
    // .populate("student_id");
    res.status(200).json({
      success: true,
      data: evaluations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
