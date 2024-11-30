import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource." });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = (req.user as User).admin;
  if (req.isAuthenticated() && isAdmin) {
    next();
  } else {
    res
      .status(401)
      .json({
        msg: "You are not authorized to view this resource because you are not an admin.",
      });
  }
};
