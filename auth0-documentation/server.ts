import express, { Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import axios from "axios";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Options from "./types/Options.interface";

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
  GIRLIEST_API_CLIENT_ID,
  GIRLIEST_API_CLIENT_SECRET,
  GIRLIEST_API_USER_EMAIL,
  GIRLIEST_API_USER_PASSWORD,
} = process.env;
const PORT = parseInt(process.env.PORT!) || 5000;

// Request an access token, and request to the custom API.
async function getTokenSendRequests() {
  const response = await axios.post(`${ISSUER_BASE_URL}/oauth/token`, {
    client_id: GIRLIEST_API_CLIENT_ID,
    client_secret: GIRLIEST_API_CLIENT_SECRET,
    audience: GIRLIEST_API,
    grant_type: "client_credentials",
  });

  return response.data.access_token;
}

getTokenSendRequests().then((token) => {
  const decoded = jwt.decode(token);
  console.log("New Token:", token);
  // console.log("Decoded Token:", decoded);

  const optionsArray: Options[] = [
    {
      method: "GET",
      url: `http://${HOST}:${PORT}/api/public`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    {
      method: "GET",
      url: `http://${HOST}:${PORT}/api/private`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    {
      method: "GET",
      url: `http://${HOST}:${PORT}/api/private-scoped`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  ];

  optionsArray.forEach((options: Options) => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
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

app.get(
  "/api/private-scoped",
  checkJwt,
  requiredScopes("read:messages"),
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
