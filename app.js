const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);

mongoose
  .connect(
    "mongodb+srv://anusuya:admin1234@cluster0.e8pdt.mongodb.net/Portfolio-app?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
