import { Router } from "express";
import { getMe } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { login, logout, refresh, register } from "./auth.service.js";

const router = Router();

// 🔓 Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// 🔐 Protected route
router.get("/me", authMiddleware, getMe);

export default router;
