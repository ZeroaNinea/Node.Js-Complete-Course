import JWT from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
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
