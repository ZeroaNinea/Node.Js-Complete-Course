import {
  login,
  logout,
  refreshToken,
  register,
} from "../Controllers/auth.controller";

import express from "express";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.delete("/logout", logout);

export default router;
