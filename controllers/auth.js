const User = require("../model/users");

exports.getSignup = (req, res, next) => {
  res.render("./signup", {
    path: "/Signup",
    PageTitle: "Signup",
  });
};

exports.getLogin = (req, res, next) => {
   res.render("./login", {
     path: "/login",
     PageTitle: "Login",
   });
 };

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.psw;
  // const confirmPassword = req.body.psw;
  const user = new User({
    email: email,
    password: password,
    // "confirmPassword":confirmPassword
  });
  user
    .save()
    .then((user) => {
     res.redirect('/login');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getportfolio = (req, res, next) => {
  res.render("./blog-single", {
    path: "/Portfolio",
    pageName: "Portfolio",
  });
};
