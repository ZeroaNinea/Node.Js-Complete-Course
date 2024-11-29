import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import passport from "passport";

import { genPassword, validPassword } from "../lib/passwordUtils";
import User from "../models/User";

router.post("/login", (req: Request, res: Response, next: NextFunction) => {});

router.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {}
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <h1>Home</h1>
    <p>Please <a href="/register">register</a></p>
  `);
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  const form = `
    <h1>Login Page</h1>
    <form method="POST" action="/login">
      \
      Enter Username:
      <br />
      <input type="text" name="username" />
      \
      <br>
      Enter Password:
      <br />
      <input type="password" name="password" />
      \
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  `;

  res.send(form);
});

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  const form = `
    <h1>Register Page</h1>
    <form method="post" action="register">
      \
      Enter Username:
      <br />
      <input type="text" name="username" />
      \
      <br />
      Enter Password:
      <br />
      <input type="password" name="password" />
      \
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>`;

  res.send(form);
});

router.get(
  "/protected-route",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      res.send(
        '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
      );
    } else {
      res.send(
        '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
      );
    }
  }
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.redirect("/protected-route");
});

router.get(
  "/login-success",
  (req: Request, res: Response, next: NextFunction) => {
    res.send(
      `<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>`
    );
  }
);

router.get(
  "/login-failure",
  (req: Request, res: Response, next: NextFunction) => {
    res.send("You entered the wrong password.");
  }
);

export default router;
