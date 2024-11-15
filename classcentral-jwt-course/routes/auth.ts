import { Request, Response } from "express";
import { User } from "../db";

const { check, validationResult } = require("express-validator");
const { users } = require("../db.ts");

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
  (req: Request, res: Response) => {
    // console.log("Request body: ", req.body);
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
      // console.log("User email: ", user.email);
      // console.log("Email: ", email);
      return user.email === email;
    });

    if (user) {
      res.status(400).json({
        errors: [
          {
            msg: "This user already exists.",
          },
        ],
      });
    }

    res.send("Validation Passed");
  }
);

module.exports = router;
