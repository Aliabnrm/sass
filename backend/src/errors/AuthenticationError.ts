import { AppError } from "./AppError.js";

export class AuthenticationError extends AppError {
  constructor(message = "احراز هویت انجام نشده است") {
    super(message, 401, "UNAUTHENTICATED");
  }
}
