const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const User = require("../users/UserModel.js");

const options = {
  usernameField: "username",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            if (payload.username === user.username) {
              return done(null, user);
            }
          }
          return done(null, false);
        })
        .catch(error => console.log("error", error));
    })
  );
};
