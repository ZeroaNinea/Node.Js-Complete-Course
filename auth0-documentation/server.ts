import express, { Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const {
  ISSUER_BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  HOST,
  FAKESTORE_API,
  GIRLIEST_API,
  GIRLIEST_API_ACCESS_TOKEN,
} = process.env;
const PORT = parseInt(process.env.PORT!) || 5000;

// Test request to my own API.
const options = {
  method: "GET",
  url: `http://${HOST}:${PORT}/api/private`,
  headers: {
    authorization: `Bearer ${GIRLIEST_API_ACCESS_TOKEN}`,
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const checkJwt = auth({
  audience: GIRLIEST_API,
  issuerBaseURL: ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
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
