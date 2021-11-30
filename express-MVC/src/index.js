const express = require("express");

const usersController = require("./controller/users.ctrl");
const studentsController = require("./controller/student.ctrl");
const evaluationsController = require("./controller/evaluation.ctrl");
const resultsController = require("./controller/result.ctrl");

const app = express();
app.use(express.json());

app.use("/users", usersController);
app.use("/students", studentsController);
app.use("/evaluations", evaluationsController);
app.use("/results", resultsController);

module.exports = app;
