import { VerifyErrors } from "jsonwebtoken";
import { UserPayload, Post } from "./interfaces";
import { Request, Response, NextFunction } from "express";

require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

let refreshTokens: string[] = [];

declare module "express-serve-static-core" {
  interface Request {
    user: UserPayload | null;
  }
}

app.post("/token", (req: Request, res: Response) => {
  const refreshToken: string = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: VerifyErrors | null, user: UserPayload | undefined) => {
      if (err) return res.sendStatus(403);
      const accessToken: string | undefined = generateAccessToken({
        name: user?.name,
      });
      res.json({ accessToken: accessToken });
    }
  );
});

app.delete("/logout", (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (req: Request, res: Response) => {
  // Authenticate user.

  const username: string = req.body.username;
  const user: { name: string } = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user: UserPayload | undefined) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(4000);
