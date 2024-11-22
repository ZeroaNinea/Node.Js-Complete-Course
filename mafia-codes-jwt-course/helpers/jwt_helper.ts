import { Response, NextFunction } from "express";
import { MiddlewareAccessRequest } from "../interfaces"; // Instead of the `Request` interface.

import JWT, { VerifyErrors, JwtPayload } from "jsonwebtoken";

import createError from "http-errors";

import dotenv from "dotenv";

import {
  redis_getValue,
  redis_setValue,
  redis_setValueWithExpiry,
} from "./redis_service";

dotenv.config();

const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
  ? parseInt(process.env.REFRESH_TOKEN_EXPIRY)
  : 60 * 60 * 24 * 365;

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
      expiresIn: "1y",
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
): void {
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

  JWT.verify(
    token,
    secret,
    (
      err: VerifyErrors | null,
      payload: string | JwtPayload | undefined
    ): void => {
      if (err) {
        const message =
          err?.name === "JsonWebTokenError"
            ? "Invalid token provided."
            : err?.message || "Authorization failed.";
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    }
  );
}

export function signRefreshToken(userId: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
      return reject(
        new Error(
          "REFRESH_TOKEN_SECRET is not defined in the environment variables."
        )
      );
    }

    const options = {
      expiresIn: "1y",
      issuer: "pickurpage.com",
      audience: userId.toString(),
    };

    JWT.sign(payload, secret, options, async (err, token) => {
      if (err) {
        console.error(err.message);
        reject(createError.InternalServerError());
      }

      try {
        await redis_setValueWithExpiry(
          userId.toString(),
          token as string,
          REFRESH_TOKEN_EXPIRY
        );
      } catch (redisError: unknown) {
        console.error("Error storing token in Redis:", redisError);
        reject(createError.InternalServerError());
      }

      resolve(token);
    });
  });
}

export function verifyRefreshToken(refreshToken: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
      return reject(
        new Error(
          "REFRESH_TOKEN_SECRET is not defined in the environment variables."
        )
      );
    }

    JWT.verify(
      refreshToken,
      secret,
      async (
        err: VerifyErrors | null,
        payload: string | JwtPayload | undefined
      ) => {
        if (err) return reject(createError.Unauthorized());
        const userId = (payload as JwtPayload)?.aud as string;

        try {
          const result = await redis_getValue(userId.toString());

          if (result === refreshToken) {
            return resolve(userId);
          } else {
            reject(createError.Unauthorized());
          }
        } catch (redisError: unknown) {
          console.error("Error getting token from Redis:", redisError);
          reject(createError.InternalServerError());
        }
      }
    );
  });
}
