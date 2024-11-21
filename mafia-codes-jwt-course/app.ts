import { Request, Response, NextFunction } from "express";

import { CustomError } from "./interfaces";

import express from "express";
import morgan from "morgan";
import createError from "http-errors";

import dotenv from "dotenv";
dotenv.config();

import "./models/sync_models";

import AuthRoute from "./routes/auth.route";

import { VerifyAccessToken } from "./helpers/jwt_helper";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  VerifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("This is your catgirl content: ", req.headers["authorization"]);
    res.send("Hello, Catgirl!");
  }
);

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
