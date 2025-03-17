import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/login", login);
router.put("/update-profile", protectRoute, updateProfile);

export default router;
