import express from "express";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(middleware);

function middleware(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from the middleware!");
  next();
}

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`<h1>Hello, World!</h1>`);
});

app.listen(3000);
