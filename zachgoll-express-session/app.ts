import { Request, Response, NextFunction } from "express";

import { Sequelize } from "sequelize";
import connectSessionSequelize from "connect-session-sequelize";
// import SequelizeStore from "connect-session-sequelize";

import express from "express";
import session from "express-session";
// import "./types/session";

import * as dotenv from "dotenv";
dotenv.config();

// declare module "express-session" {
//   interface SessionData {
//     viewCount?: number;
//   }
// }

const { DB_NAME, DB_USERNAME, DB_PASSWORD, HOST } = process.env;
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;
const PORT = parseInt(process.env.PORT!) || 3000;

const app = express();

const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: HOST,
  port: DB_PORT,
  dialect: "mysql",
});

const SequelizeStore = connectSessionSequelize(session.Store); // Allows session data to be stored in the database.
const store = new SequelizeStore({
  // Creates a new session store linked to the sequelize instance.
  db: sequelize,
});
// const SequelizeSessionStore = SequelizeStore(session.Store);
// const sessionStore = new SequelizeSessionStore({
//   db: sequelize,
// });

app.use(
  // Session settings.
  session({
    secret: "your_secret_key",
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

store.sync(); // Adds session content to the database.

// app.use(middleware);

// function middleware(req: Request, res: Response, next: NextFunction) {
//   console.log("Hello from the middleware!");
//   next();
// }

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.session);

  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times.</h1>`
  );
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}...`);
});
