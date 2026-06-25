import { AppError } from "./AppError.js";

export class AuthorizationError extends AppError {
  constructor(message = "دسترسی غیر مجاز") {
    super(message, 403, "FORBIDDEN");
  }
}
