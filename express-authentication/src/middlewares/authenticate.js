require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

module.exports = async (req, res, next) => {
  // if we received the bearer token in the header
  const bearerToken = req?.headers?.authorization;

  // if not received the token or token is invalid then throw error
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(400).json({
      status: "Unauthorized",
      message: "Please provide a valid token",
    });
  }

  //else we  will try to get the token and verify it
  const token = bearerToken.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
  } catch (err) {
    return res.status(400).json({
      status: "Unauthorized",
      message: "Please provide a valid token",
    });
  }

  // if no user found then we will throw an error
  if (!user) {
    return res.status(400).json({
      status: "Unauthorized",
      message: "Please provide a valid token",
    });
  }

  // if user found then we will set the user in the req object
  req.user = user;

  // return next
  next();
};
