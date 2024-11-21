import { ValidationResult, ValidationError } from "@hapi/joi";

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
