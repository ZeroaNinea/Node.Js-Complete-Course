import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

import User from "../models/User";
import { validPassword } from "../lib/passwordUtils";

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (username: string, password: string, done: any) => {
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  const userId = (user as User).id;
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  User.findOne({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
