const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const App = express();

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

require("./Database/connection");

App.use(express.json());
App.use(cookieParser());
const User = require("./Models/userSchema");

// Linking the Routes
App.use(require("./Routes/auth"));

// Todo - Check whether User is Logged In or not
const middleware = (req, res, next) => {
  // console.log("I am Middleware");
  next();
};

// Todo - Fetch all the News Data
App.get("/", middleware, function (req, res) {
  res.send("Hello World From Server");
});

// Todo - Register the User
App.post("/register", function (req, res) {
  res.send("Register User");
});

// Todo - Login User
App.post("/login", function (req, res) {
  res.send("Login User");
});

// Todo - Logout User
App.post("/logout", function (req, res) {
  res.send("Logout User");
});

App.listen(PORT, () => {
  console.log(`Server listening on Port:${PORT}`);
});
