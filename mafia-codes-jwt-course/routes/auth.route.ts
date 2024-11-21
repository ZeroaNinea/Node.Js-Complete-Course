import { Request, Response, NextFunction } from "express";
import express from "express";
import createError from "http-errors";
import User from "../models/user.model";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw createError.BadRequest();

      const doesExist = await User.findOne({ where: { email: email } });

      if (doesExist) {
        throw createError.Conflict(`${email} is already been registered.`);
      } else {
        const user = User.build({ email: email, password: password });
        const savedUser = await user.save();

        res.send(savedUser);
      }
    } catch (error) {
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
