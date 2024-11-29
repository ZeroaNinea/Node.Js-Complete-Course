import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User";
import { validPassword } from "../lib/passwordUtils";

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = async (
  username: string,
  password: string,
  done: any
) => {
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

passport.deserializeUser((userId: number, done) => {
  User.findOne({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
