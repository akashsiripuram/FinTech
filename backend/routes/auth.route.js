import express from "express";
import { registerUser, loginUser, refreshToken, logoutUser,protectedData } from "../controller/auth.controller.js";
import {verifyToken} from "./verifyToken.route.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/protected-route",verifyToken,protectedData)

export default router;
