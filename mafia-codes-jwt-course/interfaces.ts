import { ValidationResult, ValidationError } from "@hapi/joi";
import { Request } from "express";
import { RedisClientOptions } from "redis";

export interface MiddlewareAccessRequest extends Request {
  payload?: string | object;
}
export interface CustomError extends Error {
  status?: number;
}

export interface AuthValidationResult extends ValidationResult {
  email: string;
  password: string;
}

export interface AuthValidationError extends ValidationError {
  status?: number;
}
