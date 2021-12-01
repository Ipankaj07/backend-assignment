const express = require("express");

const userController = require("./controller/user.ctrl");
const adminController = require("./controller/admin.ctrl");

const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/admin", adminController);

module.exports = app;
