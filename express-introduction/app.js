const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Welcome to Home page");
  });

app.get("/users", (req, res) => {
   return res.send([{
    "first_name": "Bronny",
    "last_name": "Balshaw",
    "email": "bbalshaw0@icio.us",
    "gender": "Genderqueer"
  }, {
    "first_name": "Annamaria",
    "last_name": "Yallop",
    "email": "ayallop1@scribd.com",
    "gender": "Female"
  }, {
    "first_name": "Jerrome",
    "last_name": "Moors",
    "email": "jmoors2@amazonaws.com",
    "gender": "Genderqueer"
  }, {
    "first_name": "Wye",
    "last_name": "Basset",
    "email": "wbasset3@amazon.de",
    "gender": "Bigender"
  }, {
    "first_name": "Zilvia",
    "last_name": "Lindblom",
    "email": "zlindblom4@joomla.org",
    "gender": "Agender"
  }])
});

app.listen(2345, function () {
  console.log("Server is running on port 2345");
});
