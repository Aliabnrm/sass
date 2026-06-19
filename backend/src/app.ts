import cors from "cors";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 🔐 Auth API
app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

app.get("/", (_, res) => {
  res.send("Server is running");
});

export default app;