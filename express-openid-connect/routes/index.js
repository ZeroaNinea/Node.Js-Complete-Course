const request = require("request-promise-native");
const express = require("express");
const router = express.Router();
const {
  requiresAuth,
  claimEquals, // This function is unusable in a real project. Forget about it.
  claimIncludes,
  claimCheck,
} = require("express-openid-connect");

require("dotenv").config();

const { checkSessionExpiration } = require("../helpers/expiration-logic");
const { requireClaim } = require("../helpers/require-claim");
const pool = require("../config/db");
const { encrypt, decrypt } = require("../cryptography/encrypt-decrypt");

router.use((req, res, next) => {
  if (req.path === "/access-denied") {
    return next(); // Allow access to the safe redirect path.
  }
  next();
});

// Anyone can access to this route.
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get(
  "/profile",
  requiresAuth(),
  // claimEquals("isAdmin", true),
  // claimCheck((req, claims) => {
  //   if (claims.email === "a" + process.env.EMAIL) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }), // This is another useless function with infinite redirect.
  checkSessionExpiration,
  async (req, res) => {
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

      // Get user info.
      const userInfo = await req.oidc.fetchUserInfo();

      // Decript data.
      const encriptedEmail = encrypt(req.oidc.user.email);
      const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
        encriptedEmail,
      ]);

      const decryptProps = [
        "email",
        "name",
        "nickname",
        "given_name",
        "sub",
        "sid",
        "nonce",
      ];

      // Loop the array and decrypt it.
      for (let user of users) {
        for (const decryptProp of decryptProps) {
          user[decryptProp] = decrypt(user[decryptProp]);
        }
      }

      // Pass data to the template.
      res.render("profile", {
        user: req.oidc.user,
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        userInfo: JSON.stringify(userInfo, null, 2),
        products, // Include the fetched products.
        users: JSON.stringify(users, null, 2),
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).send("Failed to load profile data.");
    }
  }
);

// Implement the login (optional).
router.get("/login", (req, res) => {
  res.oidc.login({
    returnTo: process.env.BASE_URL,
    authorizationParams: {
      redirect_uri: `${process.env.BASE_URL}/callback`, // Callback URL, this should be specified in Auth0 account.
    },
  });
});

// Check if an admin.
router.get(
  "/admin",
  // Here was the `claimEquals` function.
  requireClaim("email", "a" + process.env.EMAIL), // Middleware to check the claim.
  (req, res) => {
    res.send(`Hello ${req.oidc.user.name}, this is the admin section.`);
  }
);

router.get("/access-denied", (req, res) => {
  res
    .status(403)
    .send("Access denied. You don't have the required permissions.");
});

// If has a name.
router.get("/has-name", claimIncludes("name"), (req, res) => {
  res.send(`Hehe, you have a name, that means that you're a girl!`);
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
