const express = require("express");
const qs = require("querystring");
const passport = require("passport");
const OpenIDConnectStrategy = require("passport-openidconnect");

const router = express.Router();

require("dotenv").config();

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

// Configure the strategy to work with Auth0.
passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: "https://" + AUTH0_DOMAIN + "/",
      authorizationURL: "https://" + AUTH0_DOMAIN + "/authorize",
      tokenURL: "https://" + AUTH0_DOMAIN + "/oauth/token",
      userInfoURL: "https://" + AUTH0_DOMAIN + "/userinfo",
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      return cb(null, profile);
    }
  )
);

// Serialization saves a small identifier in the session and deserialization looks up the full user object when needed.
passport.serializeUser(function (user, cb) {
  // The `serializeUser` method determines what data about the user should be stored in the session. Creates a small object with the user's `id`, `username` and `displayName` and passes it to the `cb` callback.
  process.nextTick(function () {
    // The `nextTick` method ensures that the function runs asynchronously after the current event loop.
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function (user, cb) {
  // The `deserializeUser` method retrieves the user data from the session.
  process.nextTick(function () {
    // The `nextTick` method directly returns the user object that was stored in the session during serialization.
    return cb(null, user);
  });
});

// Create the router for signing up.
router.get("/login", passport.authenticate("openidconnect"));

router.get(
  "/oauth2/redirect",
  passport.authenticate("openidconnect", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Implementation of logout.
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    const params = {
      client_id: AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    };

    res.redirect(
      "https://" + AUTH0_DOMAIN + "/v2/logout?" + qs.stringify(params)
    );
  });
});

module.exports = router;
