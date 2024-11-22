import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import User from "../models/user.model";
import { authModel } from "../helpers/validation_model";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper";
import { AuthValidationResult, AuthValidationError } from "../interfaces";
import { ValidationError } from "@hapi/joi";
import { redis_deleteValue } from "../helpers/redis_service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await authModel.validateAsync(req.body);

    const doesExist = await User.findOne({ where: { email: result.email } });

    if (doesExist) {
      throw createError.Conflict(`${result.email} is already been registered.`);
    } else {
      const user = User.build(result);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      res.send({ accessToken, refreshToken });
    }
  } catch (error: unknown) {
    const extendedError = error as AuthValidationError;

    if (error instanceof ValidationError && error.isJoi === true)
      extendedError.status = 422;
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = (await authModel.validateAsync(
      req.body
    )) as AuthValidationResult;
    const user = await User.findOne({ where: { email: result.email } });

    if (!user) throw createError.NotFound("User not registered.");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Password is not valid.");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error: unknown) {
    if (error instanceof ValidationError && error.isJoi === true)
      return next(createError.BadRequest("Invalid username or password."));
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = (await verifyRefreshToken(refreshToken)) as number;

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error: unknown) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = (await verifyRefreshToken(refreshToken)) as string;

    try {
      await redis_deleteValue(userId);
      res.sendStatus(204);
    } catch (redisError) {
      console.error("Error deleting token from Redis:", redisError);
      throw createError.InternalServerError();
    }
  } catch (error: unknown) {
    next(error);
  }
}
