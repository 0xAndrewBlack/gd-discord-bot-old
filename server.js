const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");

const lessons = require("./resources/lessons.js");
const classes = require("./resources/classes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/classes", function (req, res) {
  res.status("200").send(classes).json();
});
app.get("/classes/:id", function (req, res) {
  const query = req.params.id;
  if (query < classes.length) {
    res.status(200).json(classes[query]);
  } else {
    res.status(404).json("Class with ID:" + query + " not found!");
  }
});

app.use(function (req, res, next) {
  const err = new Error("Nem található!");
  res.status("404").json(err.message);
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json(err.message);
});

app.listen(PORT, () => console.log("Web server & API is running."));
