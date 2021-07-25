const express = require("express");
const shopRoutes = express.Router();
const User = require("../model/user");
// const bodyParser = require("body-parser");

shopRoutes.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login your Account",
  });
});

shopRoutes.post("/login", (req, res, next) => {
  const pass = req.body.password;
  console.log(user, pass);
});

//Signup middleware

shopRoutes.get("/sign_up", (req, res) => {
  res.render("sign_up", {
    pageTitle: "Sign Up a new Account",
  });
});

//@route  POST
//@desc   Register new User
//@access Public
shopRoutes.post("/register", (req, res) => {
  console.log(req.body.email);
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(404).json({ msg: "User Already Exist" });
      } else {
        const newUser = new User({
          surname: req.body.surname,
          firstname: req.body.firstname,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address,
          username: req.body.username,
          cardid: req.body.cardid,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;

            newUser
              .save()
              .then((user) => res.redirect("/confirm"))
              .catch((err) => console.log(err));
            // Store hash in your password DB.
          });
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

shopRoutes.get("/confirm", (req, res) => {
  res.render("confirm", {
    pageTitle: "Confirm your Account",
  });
});

//services middleware
shopRoutes.get("/services", (req, res) => {
  res.render("services", {
    pageTitle: "Services and Products",
  });
});

//support middleware

shopRoutes.get("/supports", (req, res) => {
  res.render("supports", {
    pageTitle: "Customer Support",
  });
});

//support middleware
shopRoutes.get("/forgot_password", (req, res) => {
  res.render("forgot_password", {
    pageTitle: "Forget Password",
  });
});

//response middleware
shopRoutes.get("/response", (req, res) => {
  res.render("respose", {
    pageTitle: "Check your response",
  });
});

//Homepage Middleware
shopRoutes.get("/", (req, res, next) => {
  res.render("index", {
    pageTitle: "Welcome to Vibrose store",
  });
});

module.exports = shopRoutes;
