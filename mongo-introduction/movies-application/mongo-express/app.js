// (1) Create an express application that uses mongoose 6.0.13 and connect it with an entertainment database

const express = require("express");
const mongoose = require("mongoose");

/* 
       >=== Steps ===<

1 - Connect to MongoDB server
2 - Create a schema for our data 
3 - Create a model from our schema

*/

// step - 1

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/entertainmentdbs");
};

//step - 2

// (2) Create a Schema for movies

const moviesSchema = new mongoose.Schema(
  {
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// step - 3

const Movie = mongoose.model("movie", moviesSchema);

const app = express();

app.use(express.json());

/* 
    movies
    get all = /movies
    post = /movies
    get one = /movies/:id
    update one = /movies/:id
    delete one = /movies/:id

    */

// (3.1) See all movies

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().lean().exec();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

//(3.2) add a new movie

app.post("/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

//(3.3) get a movie by id

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

//(3.4) update a movie by id

app.patch("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body)
      .lean()
      .exec();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

//(3.5) delete a movie by id

app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

app.listen(1234, async function () {
  await connect();

  console.log("Listening on port 1234");
});

