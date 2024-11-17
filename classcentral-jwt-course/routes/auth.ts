import { Request, Response } from "express";
import { User } from "../db";

require("dotenv").config();

const { check, validationResult } = require("express-validator");
const { users } = require("../db.ts");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email!").isEmail(),
    check(
      "password",
      "Please provide a password that is greater than 5 characters!"
    ).isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const { password, email } = req.body;

    // VALIDATED THE INPUT
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // VALIDATE IF USER DOESN'T ALREADY EXIST
    let user = users.find((user: User) => {
      return user.email === email;
    });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "This user already exists.",
          },
        ],
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    users.push({
      email,
      password: hashedPassword,
    });

    const token = await jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 3600000,
      }
    );

    // console.log(hashedPassword);

    // res.send("Validation Passed");
    res.json({ token });
  }
);

router.get("/all", (req: Request, res: Response) => {
  res.json(users);
});

module.exports = router;
