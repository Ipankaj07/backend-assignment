const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: ["www.google.com"],
        user: user.user._id,
      });

      return res.status(201).json({ product });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "user", select: "email roles" })
      .lean()
      .exec();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

/* 
update and delete routes in the products controller can be accessed by that seller and admin only and no one else is authorised on those routes
*/

/* Update*/
router.put(
  "/:id",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const products = await Product.findByIdAndUpdate(req.params.id, req.body).lean().exec();

      return res.status(200).json({ products });
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }
  }
);

/* Delete */
router.delete(
  "/:id",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const products = await Product.findByIdAndDelete(req.params.id).lean().exec();

      return res.status(200).json({ products });
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }
  }
);


module.exports = router;
