const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const { MongoClient } = require("mongodb");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const User = require("./model/users");

app.set("view engine", "ejs");
app.set("views", "views");

const MONGODB_URI = "mongodb+srv://anusuya:admin1234@cluster0.e8pdt.mongodb.net/Portfolio-app?retryWrites=true&w=majority";

const store = new MongoDBstore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(
  session({secret: 'my secret', resave: false, saveUninitialized: false, store: store})
  );

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    })
  });
    

app.use(authRoutes);

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
