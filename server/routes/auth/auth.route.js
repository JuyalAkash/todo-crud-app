import express from "express";
import userRegisterController from "../../controllers/auth/register.controller.js";
import userLoginController from "../../controllers/auth/login.controller.js";

const router = express.Router();

// ROUTES FOR USER'S
router.post("/register", userRegisterController);
router.post("/", userLoginController);

export default router;
