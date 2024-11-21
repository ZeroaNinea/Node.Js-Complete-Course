import { Request, Response, NextFunction } from "express";
import express from "express";
import createError from "http-errors";
import User from "../models/user.model";
import { authModel } from "../helpers/validation_model";
import { signAccessToken } from "../helpers/jwt_helper";
import { AuthValidationResult, AuthValidationError } from "../interfaces";
import { ValidationError } from "@hapi/joi";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authModel.validateAsync(req.body);

      const doesExist = await User.findOne({ where: { email: result.email } });

      if (doesExist) {
        throw createError.Conflict(
          `${result.email} is already been registered.`
        );
      } else {
        const user = User.build(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);

        res.send({ accessToken });
      }
    } catch (error: unknown) {
      const extendedError = error as AuthValidationError;

      if (error instanceof ValidationError && error.isJoi === true)
        extendedError.status = 422;
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = (await authModel.validateAsync(
        req.body
      )) as AuthValidationResult;
      const user = await User.findOne({ where: { email: result.email } });

      if (!user) throw createError.NotFound("User not registered.");

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) throw createError.Unauthorized("Password is not valid.");

      const accessToken = await signAccessToken(user.id);

      res.send({ accessToken });
    } catch (error: unknown) {
      if (error instanceof ValidationError && error.isJoi === true)
        return next(createError.BadRequest("Invalid username or password."));
      next(error);
    }
  }
);

router.post(
  "/refresh-token",
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Refresh token route.");
  }
);

router.delete(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Logout route.");
  }
);

export default router;
