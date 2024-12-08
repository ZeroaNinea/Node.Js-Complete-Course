import express, { Request, Response, NextFunction } from "express";

const app = express();

import User from "./src/models/User";

import "./src/connection/database";
import "./src/models/User";

import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(process.env.PORT!) || 3000;

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
    res.status(500).json({ error: err.message || "Failed to add Jane" });
    console.error(err);
  }
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}.`);
// });

export default app;
