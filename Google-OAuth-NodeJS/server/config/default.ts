import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default {
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

  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleOauthRedirectUrl:
    process.env.GOOGLE_OAUTH_REDIRECT_URL ||
    "http://localhost:1337/api/sessions/oauth/google",
};
