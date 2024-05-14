const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path')
const cors = require("cors");
const app = express();
require("dotenv").config();
const routes = require("./routes/routes");
const bookmarkRoute = require("./routes/bookmarkRoute");
const cookieParser = require("cookie-parser");

// config.
// #GNEWS = "e7de534700ec6f93ba2c69c2c0caf64f";
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})
//news
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// routes
app.use("/auth", routes);
app.use("/articles", bookmarkRoute);
// Handle other routes by serving the index.html file
app.use(express.static('static'));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});


// Connect Mongodb
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log("Connected MONGODB");
    app.listen(5000, () => {
      console.log(`Listening on Port 5000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
