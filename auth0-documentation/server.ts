import express, { Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const { BASE_URL, CLIENT_ID, CLIENT_SECRET, HOST, FAKESTORE_API } = process.env;
const PORT = parseInt(process.env.PORT!) || 5000;

const checkJwt = auth({
  audience: FAKESTORE_API,
  issuerBaseURL: BASE_URL,
});

// This route doesn't need authentication.
app.get("/api/public", function (req: Request, res: Response) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication.
app.get("/api/private", checkJwt, function (req: Request, res: Response) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

const checkScopes = requiredScopes("read:messages");

app.get(
  "/api/private-scoped",
  checkJwt,
  checkScopes,
  function (req: Request, res: Response) {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

app.listen(PORT, function () {
  console.log(`Server runing on: http://${HOST}:${PORT}`);
});
