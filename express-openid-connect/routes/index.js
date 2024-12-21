const request = require("request-promise-native");
const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

require("dotenv").config();

// Anyone can access to this route.
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/profile", requiresAuth(), async (req, res) => {
  try {
    // Fetch products using the access token.
    const { token_type, access_token, isExpired, refresh } =
      req.oidc.accessToken || {};

    if (isExpired()) {
      ({ access_token } = await refresh()); // Update access token with refresh token.
    }

    const apiUrl = "https://fakestoreapi.com/products";

    const products = await request.get(apiUrl, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
      json: true,
    });

    // Pass data to the template.
    res.render("profile", {
      user: req.oidc.user,
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      products, // Include the fetched products.
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Failed to load profile data.");
  }
});

// Implement the login (optional).
router.get("/login", (req, res) => {
  res.oidc.login({
    returnTo: process.env.BASE_URL,
    authorizationParams: {
      redirect_uri: `${process.env.BASE_URL}/callback`, // Callback URL, this should be specified in Auth0 account.
    },
  });
});

// Implementation of the GET request of the callback (optional).
router.get("/callback", (req, res) => {
  res.oidc.callback({
    redirectUri: `${process.env.BASE_URL}/callback`,
  });
});

// Implementation of the POST request of the callback (optional).
router.post(
  "/callback",
  // The `express.urlencoded` middleware is used to parse incoming application/x-www-form-urlencoded payloads, which are typical for POST requests in the form_post response mode.
  express.urlencoded({ extended: false }),
  (req, res) => {
    res.oidc.callback({
      redirectUri: `${process.env.BASE_URL}/callback`,
    });
  }
);

// The profile page, to get access a user must be authenticated.
router.get("/profile", requiresAuth(), function (req, res, next) {
  // The function `requiresAuth` requires authentication for specific routes.
  res.render("profile", {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: "Profile page",
  });
});

// Implement logout.
router.get("/logout", (req, res) => {
  res.oidc.logout({ returnTo: process.env.BASE_URL });
});

module.exports = router;
