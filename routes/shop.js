const express = require("express");
const shopRoutes = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Secet";
// const bodyParser = require("body-parser");

shopRoutes.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login your Account",
  });
});

shopRoutes.post("/login", async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    let userInDb = await User.findOne({ email: username });
    if (userInDb) {
      bcrypt.compare(password, userInDb.password, (err, isMatch) => {
        if (isMatch) {
          let tokenData = { userId: userInDb._id, username: userInDb.username };
          const token = jwt.sign(tokenData, jwtSecret);

          res.cookie("auth", token);

          userInDb = { token, user: userInDb };

          return res.render("dashboard", {
            pageTitle: "Dashboard",
            user: userInDb,
          });
          // console.log('o de bi')
        } else {
          // Incorrect password error
          res.render("404", {
            pageTitle: "Error",
          });
          console.log("incorrect pwd");
        }
      });
    } else {
      console.log("email not found eror");
      res.render("404", {
        pageTitle: "Error",
      });
    }
  } catch (err) {
    res.render("404", {
      pageTitle: "Error",
    });
    console.log(err);
  }
});

// shopRoutes.get("/dashboard", (req, res) => {
//   res.render("dashboard", {
//     pageTitle: "Dashboard",
//   });
// });
//Signup middleware

shopRoutes.get("/sign_up", (req, res) => {
  res.render("sign_up", {
    pageTitle: "Sign Up a new Account",
  });
});

//@route  POST
//@desc   Register new User
//@access Public
// shopRoutes.post("/register", (req, res) => {
//   console.log(req.body.email);
//   user
//     .findOne({ email: req.body.email })
//     .then((user) => {
//       if (user) {
//         res.status(404).json({ msg: "User Already Exist" });
//       } else {
//         const newUser = new User({
//           surname: req.body.surname,
//           firstname: req.body.firstname,
//           email: req.body.email,
//           password: req.body.password,
//           address: req.body.address,
//           username: req.body.username,
//           cardid: req.body.cardid,
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             newUser.password = hash;

//             newUser
//               .save()
//               .then((user) => res.redirect("/confirm"))
//               .catch((err) => console.log(err));
//             // Store hash in your password DB.
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

shopRoutes.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(404)
        .json({ msg: "User Already Exist" })
        .redirect("/sign_up");
    }

    const newUser = new User({
      surname: req.body.surname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      username: req.body.username,
      cardid: req.body.cardid,
    });

    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;

        newUser.save().then((user) => res.redirect("/confirm"));
        // Store hash in your password DB.
      });
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Error",
    });
    console.log(err);
  }
});

//
shopRoutes.get("/payment", (req, res) => {
  res.render("payment", {
    pageTitle: "Update Payment",
  });
});

//
shopRoutes.get("/confirm", (req, res) => {
  res.render("confirm", {
    pageTitle: "Confirm Update",
  });
});

shopRoutes.get("/addcustomer", (req, res) => {
  res.render("addcustomer", {
    pageTitle: "Add customer  ",
  });
});

shopRoutes.get("/updatecustomer", (req, res) => {
  res.render("updatecustomer", {
    pageTitle: "Updat details ",
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
