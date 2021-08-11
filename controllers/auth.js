const User = require("../model/users");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render("./login", {
    path: "/login",
    PageTitle: "Login",
    errorMessage: message,
    isAuthenticated: req.session.isLoggedIn,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.psw;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect("/login");
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("./login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid email or password.",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      } else {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect("/");

      }
    })
    .catch((err) => {
      res.send("user not found");
    });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("./signup", {
    path: "/Signup",
    PageTitle: "Signup",
    errorMessage: message,
    isAuthenticated: req.session.isLoggedIn,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.psw;
  const repeatPassword = req.body.repeatPassword;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("./signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: repeatPassword,
      },
      validationErrors: errors.array(),
    });
  }
  User.findOne({
    email: email,
  }).then((userDoc) => {
    if (userDoc) {
      req.flash("error", "E-Mail exists already, please pick a different one.");
      return res.redirect("/signup");
    }
    const user = new User({
      email: email,
      password: password,
    });
    user
      .save()
      .then((user) => {
        res.redirect("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.getportfolio = (req, res, next) => {
  res.render("./blog-single", {
    path: "/Portfolio",
    pageName: "Portfolio",
    isAuthenticated: req.session.isLoggedIn,
  });
};
