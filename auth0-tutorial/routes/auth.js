const express = require("express");
const qs = require("querystring");
const passport = require("passport");
// const OpenIDConnectStrategy = require("passport-openidconnect");
const OAuth2Strategy = require("passport-oauth2");

const db = require("../db");

const router = express.Router();

require("dotenv").config();

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

/*
// Configure the strategy to work with Auth0 in the main branch.
*/

// Configure strategy to work with Auth0 in the `auth0-tutorial_passport-oauth2` branch.
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://" + AUTH0_DOMAIN + "/authorize",
      tokenURL: "https://" + AUTH0_DOMAIN + "/oauth/token",
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect",
    },
    (accessToken, refreshToken, profile, cb) => {
      const userId = profile.id; // Assume `profile.id` is unique.
      let username = profile.username || profile.displayName || "Unknown User";

      // Query to check if the user already exists by ID.
      const query = "SELECT * FROM users WHERE id = ?";
      db.get(query, [userId], (err, row) => {
        if (err) return cb(err);

        if (row) {
          // User exists, return the user.
          return cb(null, row);
        } else {
          // Check for username conflicts.
          const checkQuery = "SELECT * FROM users WHERE username = ?";
          db.get(checkQuery, [username], (checkErr, existingUser) => {
            if (checkErr) return cb(checkErr);

            if (existingUser) {
              // Resolve username conflict by appending a random suffix.
              username = `${username}_${Math.floor(Math.random() * 10000)}`;
            }

            // Insert the new user into the database.
            const insertQuery =
              "INSERT INTO users (id, username) VALUES (?, ?)";
            db.run(insertQuery, [userId, username], function (insertErr) {
              if (insertErr) return cb(insertErr);

              // Return newly inserted user.
              return cb(null, { id: userId, username });
            });
          });
        }
      });
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

/*
// Create the router for signing up in the main branch.
*/

// Create the router for signing up in the `auth0-tutorial_passport-oauth2` branch.
router.get("/login", passport.authenticate("oauth2"));

router.get(
  "/oauth2/redirect",
  passport.authenticate("oauth2", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

/*
// Implementation of logout in the main branch.
*/

// Implementation of logout in the `auth0-tutorial_passport-oauth2` branch.
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out.");

    const params = {
      client_id: AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    };

    res.redirect(`https://${AUTH0_DOMAIN}/v2/logout?${qs.stringify(params)}`);
  });
});

module.exports = router;
