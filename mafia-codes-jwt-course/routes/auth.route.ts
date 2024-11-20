import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Register route.");
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

module.exports = router;
