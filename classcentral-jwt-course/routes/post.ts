import { Request, Response } from "express";
import { Post } from "../db";

const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db");
const checkAuth = require("../middleware/checkAuth");

router.get("/public", (req: Request, res: Response) => {
  res.json(publicPosts);
});

router.get("/private", checkAuth, (req: Request, res: Response) => {
  res.json(privatePosts);
});

module.exports = router;
