import { Request, Response } from "express";

const express = require("express");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Hi, I'm working!</h1>`);
});

app.listen(5000, () => {
  console.log("Now the server is running on the port 5000...");
});
