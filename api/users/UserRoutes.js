const express = require("express");
const router = express.Router();
const User = require("./UserModel.js");

router.post("/register", (req, res) => {
  const newUserData = {
    username: req.body.username,
    password: req.body.password
  };
  User.save(newUserData)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
