const express = require("express");

const app = express();

const books = require("./books_data.json");

app.use(express.json());

// const authenticate = (req, res, next) => {
//   console.log("Authenticating");
//   next();
// };

let name = "Pankaj Raj";

const authorise = (name) => {
  return (req, res, next) => {
    const originalSendFunc = res.send.bind(res);
    res.send = (body) => {
      body.api_requested_by = name;
      return originalSendFunc(body);
    };
    next();
  };
};

// get all data

app.get("/", authorise(name), (req, res) => {
  res.send({ api_requested_by: "", books });
});

//add book

app.post("/books", authorise(name), (req, res) => {
  const newBooks = [...books, req.body];
  res.send({ api_requested_by: "", newBooks });
});

// find book

app.get("/books/:id", authorise(name), (req, res) => {
  const { id } = req.params;
  const book = books.filter((book) => book.id === +id);
  res.send({ api_requested_by: "", book });
});

//update book

app.patch("/books/:id", authorise(name), (req, res) => {
  const { id } = req.params;
  const { author, published_year } = req.body;
  const book = books.find((book) => book.id === +id);
  book.author = author;
  book.published_year = published_year;
  res.send({ api_requested_by: "", book });
});

//delete book

app.delete("/books/:id", authorise(name), (req, res) => {
  const { id } = req.params;
  const newBooks = books.filter((book) => book.id !== +id);
  res.send({ api_requested_by: "", newBooks });
});

app.listen(2323, () => {
  console.log("listening on port 2323");
});
