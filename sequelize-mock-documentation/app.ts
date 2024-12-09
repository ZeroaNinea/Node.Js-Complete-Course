import express, { Request, Response, NextFunction } from "express";

const app = express();

import User from "./src/models/User";

import "./src/connection/database";
import "./src/models/User";

import dotenv from "dotenv";
dotenv.config();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const jane = User.build({
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
  });

  try {
    await jane.save();

    res.status(200).json(jane);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to add Jane." });
    console.error(err);
  }
});

app.get(
  "/get-full-name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jane = await User.findOne({ where: { id: 1 } });

      res.status(200).json({ fullName: jane?.getFullName() });
    } catch (err: any) {
      res.status(404).json({ error: err.message || "Jane not found." });
    }
  }
);

export default app;
