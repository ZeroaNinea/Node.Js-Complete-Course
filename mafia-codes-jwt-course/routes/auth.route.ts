import { Request, Response, NextFunction } from "express";
import express from "express";
import createError from "http-errors";
import User from "../models/user.model";
import { authModel } from "../helpers/validation_model";
import { signAccessToken } from "../helpers/jwt_helper";

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
    } catch (error: any) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Login route.");
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
