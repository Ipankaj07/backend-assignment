const express = require("express");

const router = express.Router();

const Post = require("../models/post.model");

const auththenticate = require("../middlewares/authenticate");

router.post("/", auththenticate, async (req, res) => {
  try {
    const user = req.user;

    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: user.user._id,
    });

    return res.status(201).json({ post });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.get("/", auththenticate, async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
