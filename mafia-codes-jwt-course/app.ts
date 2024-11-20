import { Request, Response, NextFunction } from "express";

import { CustomError } from "./interfaces";

const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_sequelize");

const AuthRoute = require("./routes/auth.route");

const app = express();
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, World!");
});

app.use("/auth", AuthRoute);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  // The alternative method to create an error.
  /*
  const error: CustomError = new Error("The page is not found.");
  error.status = 404;
  next(error);
  */
  // Create an error with `http-errors` module.
  next(createError.NotFound("This route does not exist."));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is runnig on the port ${PORT}...`);
});
