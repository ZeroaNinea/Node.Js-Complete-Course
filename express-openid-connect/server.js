const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const logger = require("morgan");
const path = require("path");
const { auth } = require("express-openid-connect");
const base64Url = require("base64url");

const router = require("./routes/index");

dotenv.load();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const config = {
  authRequired: false,
  idpLogout: true, // The user additionally logs out of the IDP session when clicks on the "logout."
  auth0Logout: true, // If using custom domain with Auth0 (logout).
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  // secret: process.env.SECRET,
  clientSecret: process.env.SECRET,
  /*
  // Custom routes.
  routes: {
    // Pass custom options to the login method by overriding the default login route.
    login: false,
    // Pass a custom path to the postLogoutRedirect to redirect users to a different.
    // Path after login, this should be registered on your authorization server.
    postLogoutRedirect: '/custom-logout',
    callback: false,
  },
  */
  routes: {
    callback: "/callback", // Enable the callback route.
  },
  authorizationParams: {
    response_type: "code",
    audience: "https://fakestoreapi.com/products",
    scope: "openid profile email read:products",
    prompt: "consent", // Requires consent of the user.
  },
  afterCallback: (req, res, session) => {
    // The `afterCallback` hook validates specific claims in the user's ID token after the authentication process.
    const token = session.id_token;

    // Decode the token payload.
    const payload = JSON.parse(base64Url.decode(token.split(".")[1]));

    // Check user's email.
    if (payload.email !== "zeroaninea@gmail.com") {
      throw new Error("Unauthorized email");
    }

    return session;
  },
};

const port = process.env.PORT || 3000;
if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== "production"
) {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views.
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use("/", router);

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on ${config.baseURL}`);
});
