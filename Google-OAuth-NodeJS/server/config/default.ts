import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default {
  authRequired: false,
  auth0Logout: true,
  port: 1337,
  origin: "http://localhost:3000",
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: fs.readFileSync(
    path.join(__dirname, "../keys/public.pem"),
    "utf8"
  ),
  privateKey: fs.readFileSync(
    path.join(__dirname, "../keys/private.pem"),
    "utf8"
  ),

  auth0ClientId: process.env.AUTH0_CLIENT_ID || "",
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET || "",
  auth0Domain:
    process.env.AUTH0_OAUTH_REDIRECT_URL ||
    "https://dev-8fltw5leydf6r72y.us.auth0.com",
};
