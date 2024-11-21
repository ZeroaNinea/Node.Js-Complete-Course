import { Response, NextFunction } from "express";
import { MiddlewareAccessRequest } from "../interfaces"; // Instead of the `Request` interface.

import JWT from "jsonwebtoken";

import createError from "http-errors";

import dotenv from "dotenv";

dotenv.config();

export function signAccessToken(userId: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      return reject(
        new Error(
          "ACCESS_TOKEN_SECRET is not defined in the environment variables."
        )
      );
    }

    const options = {
      expiresIn: "1h",
      issuer: "pickurpage.com",
      audience: userId.toString(),
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }

      resolve(token);
    });
  });
}

export function VerifyAccessToken(
  req: MiddlewareAccessRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables."
    );
  }

  JWT.verify(token, secret, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized());
    }
    req.payload = payload;
    next();
  });
}
