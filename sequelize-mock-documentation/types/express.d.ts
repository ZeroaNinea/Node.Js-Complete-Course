import * as express from "express";

declare global {
  namespace Express {
    interface Response {
      body: object;
    }
  }
}
