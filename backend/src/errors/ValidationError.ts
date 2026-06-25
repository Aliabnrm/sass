import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(message = "اطلاعات وارد شده معتبر نیست") {
    super(message, 400, "VALIDATION_ERROR");
  }
}
