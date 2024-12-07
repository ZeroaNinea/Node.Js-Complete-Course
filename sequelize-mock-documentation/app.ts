import express, { Request, Response, NextFunction } from "express";

const app = express();

import "./src/connection/database";
import "./src/models/User";

import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(process.env.PORT!) || 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`<h1>Hi, I'm working!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
