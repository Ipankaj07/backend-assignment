/*
Topic - Relationships 

Problem

Create a Library system which has following models

Section ( 1 Book can belong to only one section at a time but 1 section can have multiple books )
Books ( Book can be written by 1 or more author and also contains name, body )
Author ( an author can write one or more books and he also has first_name and last_name)
CheckedOut (one book can be checked out by 1 user at a time)

Write CRUD for all these models and also write api endpoints that can help with below situations

find books that are checked out
find all books written by an author
find books in a section
find books in a section that are not checked out
find books of 1 author inside a section */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/booksdbs");
};

/* ==========================================  S C H E M A  ========================================================== */

// section schema

const sectionSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Section = mongoose.model("section", sectionSchema);

//Author schema

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Author = mongoose.model("author", authorSchema);

//book - Schema

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    checked_out: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("book", bookSchema);

// users Schema

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// schema for book added by user in checkout section with book id and user id and mark true on the book which is checked out.

const checkoutSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    checked_out: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

Checkout = mongoose.model("checkout", checkoutSchema);

/* ==========================================  C R U D  ========================================================== */

//section

app.post("/section", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/section", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/section/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("author_id")
      .populate("book_id")
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Author

app.post("/author", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(200).json({
      success: true,
      data: author,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/author", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();

    return res.status(200).json({
      success: true,
      data: author,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/author/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();

    return res.status(200).json({
      success: true,
      data: author,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//find books of 1 author inside a section

/* --- ( 05 )---- v */

app.get("/author/book/section/:id", async (req, res) => {
  try {
    const book = await Book.find({ section_id: req.params.id })
      .populate("author_id")
      .populate("section_id")
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// User

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// books

app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/book", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//find book in a section

/* --- ( 03 )---- v */

app.get("/book/section/:id", async (req, res) => {
  try {
    const book = await Book.find({ section_id: req.params.id })
      .populate("author_id")
      .populate("section_id")
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//find book by author_id

/* ----- ( 02 )---- v */

app.get("/book/author/:id", async (req, res) => {
  try {
    const book = await Book.find({ author_id: req.params.id })
      .populate("author_id")
      .populate("section_id")
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// checkout

// add to checkout database  which book is added by user in checkout section

app.post("/checkout", async (req, res) => {
  try {
    const checkout = await Checkout.create(req.body);
    return res.status(200).json({
      success: true,
      data: checkout,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//find books that are checked out by users

/* --- ( 01 ) ---- v */

app.get("/checkout", async (req, res) => {
  try {
    const checkout = await Checkout.find().populate("book_id").lean().exec();
    return res.status(200).json({
      success: true,
      data: checkout,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// find checkout book by user id

app.get("/checkout/user/:id", async (req, res) => {
  try {
    const checkout = await Checkout.find({ user_id: req.params.id })
      .populate("book_id")
      .lean()
      .exec();
    return res.status(200).json({
      success: true,
      data: checkout,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// rest all Book ( not checked out book)

//find all books --> checked_out : false from all over database

app.get("/not-checkout/all", async (req, res) => {
  try {
    const checkout = await Book.find({ checked_out: false })
      .populate("author_id")
      .populate("section_id")
      .lean()
      .exec();
    return res.status(200).json({
      success: true,
      data: checkout,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//find all books in a section --> checked_out : false from all over database

/* --- ( 04 )---- v */

app.get("/not-checkout/section/:id", async (req, res) => {
  try {
    const checkout = await Book.find({
      section_id: req.params.id,
      checked_out: false,
    })
      .populate("author_id")
      .populate("section_id")
      .lean()
      .exec();
    return res.status(200).json({
      success: true,
      data: checkout,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(3000, async () => {
  await connect();
  console.log("listening on port 3000");
});
