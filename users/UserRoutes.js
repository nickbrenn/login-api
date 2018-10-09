const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("./UserModel.js");
const secret = process.env.SECRET;

router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;
    user.password = null;
    res.status(200).json({ user });
  }
);

router.post("/register", (req, res) => {
  const newUserData = {
    username: req.body.username,
    password: req.body.password
  };
  const newUser = new User(newUserData);
  newUser
    .save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("error:", error);
      res.status(500).send();
    });
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      user
        .checkPassword(req.body.password)
        .then(verified => {
          if (verified) {
            const payload = {
              id: user._id,
              username: user.username,
              password: user.password
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: "7d"
            });
            res.status(200).json({ token });
          } else {
            res.status(500).send();
          }
        })
        .catch(error => {
          console.log("error:", error);
          res.status(500).send();
        });
    })
    .catch(error => {
      console.log("error:", error);
      res.status(404).send();
    });
});

module.exports = router;
