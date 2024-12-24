import express, { Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const { BASE_URL, CLIENT_ID, CLIENT_SECRET, HOST, FAKESTORE_API } = process.env;
const PORT = parseInt(process.env.PORT!) || 5000;

var options = {
  method: "GET",
  url: FAKESTORE_API,
  headers: {
    authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtfNjItWVVFZzlGQWozYVNrN2taRiJ9.eyJpc3MiOiJodHRwczovL2Rldi04Zmx0dzVsZXlkZjZyNzJ5LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJvR1lPSUhlV3FJNUVWejgwS084djJEcXYzejdFaUVQekBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mYWtlc3RvcmVhcGkuY29tL3Byb2R1Y3RzIiwiaWF0IjoxNzM1MDc3NzYwLCJleHAiOjE3MzUxNjQxNjAsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6Im9HWU9JSGVXcUk1RVZ6ODBLTzh2MkRxdjN6N0VpRVB6In0.ShtDpR0GL72PhDDnoBsVu9xU86KgIYqNYc70n-rzh4Gx52m8iTD-RKPr2_x9laqrMk3NHnuD_l_iXTY8iSUS_pwod99K_kCyYxDVJiNwXu4Uz1I5GceVeYtzZzT4UIkHIlpD15m4gie8WGcsCNzHE7b6ZGYqriu6ebXkyB3kzVY8Mkn2MNoA-FMVFyM0inTvGShzNqqJ0RtzsfmIxh0LsS_dovjMmJS0T3VGHPY5R43Nlhhe9tuBveUzATSuRWeMOXCDmMFQQzGvHDzRwDoyYRCqFWt7M256Bi4c1dlFN3v_Jret9FlE7Hl4yh63PNRJ27iTar7vy6cqpPvABQf4cg`,
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
