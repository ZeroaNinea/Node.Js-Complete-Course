import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import passport from "passport";
import crypto from "crypto";

import router from "./routes/auth.routes";
import sequelize from "./config/database";
import User from "./models/User";
import "./config/passport";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const { SESSION_SECRET_KEY } = process.env;
const PORT = parseInt(process.env.PORT!) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

const SequelizeStore = connectSessionSequelize(session.Store); // Allows session data to be stored in the database.
const store = new SequelizeStore({
  // Creates a new session store linked to the sequelize instance.
  db: sequelize,
});

app.use(
  // Session settings.
  session({
    secret: SESSION_SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 1 day.
      httpOnly: false, // Allow access to cookies via JavaScript (debugging only).
      secure: false, // Send cookies over non-HTTPS connections.
      sameSite: "lax", // Mitigate CSRF while allowing cross-origin navigation.
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
