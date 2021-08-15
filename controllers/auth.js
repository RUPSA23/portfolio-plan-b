const User = require("../model/users");
const { validationResult } = require("express-validator");
const UserDetails = require("../model/user-details");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  // console.log(req.session.isLoggedIn);
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
        res.redirect("/form");
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

exports.getuserid = (req, res, next) => {
  const userid = req.params.userId;

  UserDetails.findOne({ user_id: userid })
    .then((userdetails) => {
      console.log(userdetails);
      res.render("./index", {
        data: userdetails,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getForm = (req, res, next) => {
  res.render("./form", {
    path: "/form",
    pageName: "Form",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postForm = (req, res, next) => {
  let user_id = req.session.user._id;
  console.log(user_id);

  const name = req.body.name;
  const skills = req.body.skill;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const pageName = req.body.pagename;
  const fullName = req.body.fullname;
  const profile = req.body.profile;
  const about_me1 = req.body.aboutme1;
  const about_me2 = req.body.aboutme2;
  const about_me3 = req.body.aboutme3;

  const serviceTitle1 = req.body.serviceTitle1;
  const serviceDescription1 = req.body.serviceDescription1;
  const serviceIcon1 = req.body.serviceIcon1;
  const serviceTitle2 = req.body.serviceTitle2;
  const serviceDescription2 = req.body.serviceDescription2;
  const serviceIcon2 = req.body.serviceIcon2;
  const serviceTitle3 = req.body.serviceTitle3;
  const serviceDescription3 = req.body.serviceDescription3;
  const serviceIcon3 = req.body.serviceIcon3;

  const portfolioTitle1 = req.body.portfolioTitle1;
  const portfolioCategory1 = req.body.portfolioCategory1;
  const portfolioImage1 = req.body.portfolioImage1;
  const portfolioTitle2 = req.body.portfolioTitle2;
  const portfolioCategory2 = req.body.portfolioCategory2;
  const portfolioImage2 = req.body.portfolioImage2;
  const portfolioTitle3 = req.body.portfolioTitle3;
  const portfolioCategory3 = req.body.portfolioCategory3;
  const portfolioImage3 = req.body.portfolioImage3;

  const containerTitle1 = req.body.containerTitle1;
  const containerCount1 = req.body.containerCount1;
  const containerIcon1 = req.body.containerIcon1;
  const containerTitle2 = req.body.containerTitle2;
  const containerCount2 = req.body.containerCount2;
  const containerIcon2 = req.body.containerIcon2;
  const containerTitle3 = req.body.containerTitle3;
  const containerCount3 = req.body.containerCount3;
  const containerIcon3 = req.body.containerIcon3;

  data = {
    pageName,
    name,
    fullName,
    skills,
    profile,
    email,
    phone,
    about_me1,
    about_me2,
    about_me3,
    address,
  };

  container = [
    {
      container_title: containerTitle1,
      container_count: containerCount1,
      container_icon: containerIcon1,
    },
    {
      container_title: containerTitle2,
      container_count: containerCount2,
      container_icon: containerIcon2,
    },
    {
      container_title: containerTitle3,
      container_count: containerCount3,
      container_icon: containerIcon3,
    },
  ];

  portfolio = [
    {
      portfolio_title: portfolioTitle1,
      portfolio_category: portfolioCategory1,
      portfolio_date: "new date.now()",
      portfolio_img: portfolioImage1,
    },
    {
      portfolio_title: portfolioTitle2,
      portfolio_category: portfolioCategory2,
      portfolio_date: "new date.now()",
      portfolio_img: portfolioImage2,
    },
    {
      portfolio_title: portfolioTitle3,
      portfolio_category: portfolioCategory3,
      portfolio_date: "new date.now()",
      portfolio_img: portfolioImage3,
    },
  ];

  services = [
    {
      services_title: serviceTitle1,
      services_description: serviceDescription1,
      services_icon: serviceIcon1,
    },
    {
      services_title: serviceTitle2,
      services_description: serviceDescription2,
      services_icon: serviceIcon2,
    },
    {
      services_title: serviceTitle3,
      services_description: serviceDescription3,
      services_icon: serviceIcon3,
    },
  ];

  User.findOne({
    _id: user_id,
  }).then((user) => {
    console.log(user);

    if (!user) {
      console.log("NO USER FOUND");
      req.flash("error", "please pick a valid email.");
      return res.redirect("/form");
    }

    console.log("USER FOUND");

    const userDetails = new UserDetails({
      user_id,
      data: data,
      container: container,
      portfolio: portfolio,
      services: services,
    });

    userDetails
      .save()
      .then((user_details) => {
        console.log("details saved successfully");
        res.redirect(`/${user_id}`);
        // res.redirect(`/${user_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
