import app from "./app.js";
import dotenv from "dotenv";
import { logger } from "./logger/logger.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

process.on("uncaughtException", (error) => {
  logger.fatal(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(reason);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
