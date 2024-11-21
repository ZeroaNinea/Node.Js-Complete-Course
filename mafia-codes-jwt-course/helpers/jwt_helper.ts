import JWT from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
import { underscoredIf } from "sequelize/types/utils";

dotenv.config();

export function signAccessToken(userId: number) {
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

    console.log("ACCESS_TOKEN_SECRET", process.env.ACCESS_TOKEN_SECRET);

    const options = {
      expiresIn: "1h",
      issuer: "pickurpage.com",
      audience: userId.toString(),
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
