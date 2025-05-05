import express from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.contoller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh-token", refreshToken);

export default router;
