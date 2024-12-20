var router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");

require("dotenv").config();

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/profile", requiresAuth(), function (req, res, next) {
  res.render("profile", {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: "Profile page",
  });
});

router.get("/logout", (req, res) => {
  res.oidc.logout({ returnTo: process.env.BASE_URL });
});

module.exports = router;
