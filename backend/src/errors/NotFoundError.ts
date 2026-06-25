import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(resource = "مورد") {
    super(`${resource} یافت نشد`, 404, "NOT_FOUND");
  }
}
