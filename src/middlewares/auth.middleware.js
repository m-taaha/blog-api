import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token; // token from browser

  if (!token) {
    return res.status(400).json({ message: `Unauthorized user` });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: `Unauthorized, User not found` });
    }

    req.user = user; //aTTach user req to user
    next();
  } catch (error) {
    return res.status(401).json({ message: `Invalid or token expired` });
  }
};

export { isAuthenticated };
