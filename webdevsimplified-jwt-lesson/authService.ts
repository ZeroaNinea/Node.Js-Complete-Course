import { VerifyErrors } from "jsonwebtoken";
import { UserPayload, Post } from "./interfaces";
import { Request, Response, NextFunction } from "express";

require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

declare module "express-serve-static-core" {
  interface Request {
    user: UserPayload | null;
  }
}

// const posts: Post[] = [
//   {
//     username: "Kyle",
//     title: "Post 1",
//   },
//   {
//     username: "Jim",
//     title: "Post 2",
//   },
// ];

// app.get("/posts", authenticateToken, (req: Request, res: Response) => {
//   console.log(req.user, "This is the cat user's post.");
//   res.json(posts.filter((post) => post.username === req.user?.name));
// });

app.post("/login", (req: Request, res: Response) => {
  // Authenticate user.

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: VerifyErrors | null, user: UserPayload | null) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}

app.listen(4000);
