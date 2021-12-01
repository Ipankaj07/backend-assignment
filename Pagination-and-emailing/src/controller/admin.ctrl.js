const express = require("express");
const router = express.Router();
const Admin = require("../model/admin.model");

router.post("", async (req, res, next) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    return res.status(201).send(admin);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("", async (req, res, next) => {
  try {
    const admin = await Admin.find().lean().excet();
    return res.status(200).send(admin);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
