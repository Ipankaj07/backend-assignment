const express = require("express");

const { body, validationResult } = require("express-validator");

const { register, login } = require("./controllers/auth.ctrl");

const postController = require("./controllers/post.ctrl");

const app = express();

app.use(express.json());

app.post(
  "/register",
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("email").custom(async (value) => {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(value);
    const listOfDomains = [
      "masai.school",
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "ymail.com",
      "mail.com",
    ];
    const aCheck = value.includes("@");
    if (!aCheck) {
      throw new Error("In Email @ is required");
    } else {
      const email = value.split("@");
      const domain = email[1];
      if (!listOfDomains.includes(domain)) {
        throw new Error("we do not support this domain");
      }
      if (!isEmail) {
        throw new Error("Please enter a valid email address");
      }
    }
    return true;
  }),
  body("password").custom(async (value) => {
    const inputPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        value
      );

    // console.log("password", value);

    password = value;

    // console.log("password", password);

    let length = password.length >= 8 ? true : false;
    if (!length) {
      throw new Error("Password must be at least 8 characters long");
    }

    let capital = password.match(/[A-Z]/) ? true : false; // check capital letter

    if (!capital) {
      throw new Error("Password must contain at least one capital letter");
    }

    let lower = password.match(/[a-z]/) ? true : false; // check lower letter

    if (!lower) {
      throw new Error("Password must contain at least one small letter");
    }

    let number = password.match(/[0-9]/) ? true : false; // check number

    if (!number) {
      throw new Error("Password must contain at least one number");
    }

    let special = password.match(/[!@#$%^&*]/) ? true : false; // special characters

    if (!special) {
      throw new Error("Password must contain at least one special character");
    }

    return true;
  }),
  register
);

app.post("/login", login);

app.use("/post", postController);

app.use("/get", postController);

module.exports = app;
