import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//protected routes
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "User data fetched Successfully",
    user: req.user,
  });
});

export default router;
