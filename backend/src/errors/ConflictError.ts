import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
  constructor(message = "داده تکراری است") {
    super(message, 409, "CONFLICT");
  }
}
