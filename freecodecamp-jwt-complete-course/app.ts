import { Request, Response, NextFunction } from "express";

import { Sequelize } from "sequelize";
import connectSessionSequelize from "connect-session-sequelize";

import express from "express";
import session from "express-session";

import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, HOST } = process.env;
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;
const PORT = parseInt(process.env.PORT!) || 3000;

const app = express();

const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: HOST,
  port: DB_PORT,
  dialect: "mysql",
});

const SequelizeStore = connectSessionSequelize(session.Store);

const store = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

store.sync();

// app.use(middleware);

// function middleware(req: Request, res: Response, next: NextFunction) {
//   console.log("Hello from the middleware!");
//   next();
// }

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`<h1>Hello, World!</h1>`);
});

app.listen(PORT, () =>
  console.log(`The server is running on port: ${PORT}...`)
);
