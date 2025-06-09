import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlogById,
} from "../controllers/blog.controller.js";

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

//routes for crud blog

//public routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);

//protected routes
router.post("/blogs", isAuthenticated, createBlog);
router.put("/blogs/:id", isAuthenticated, updateBlog);
router.delete("/blogs/:id", isAuthenticated, deleteBlogById);

export default router;
