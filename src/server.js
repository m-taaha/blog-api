import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // connect to the database

app.use(cors());
app.use(express.json()); //parse JSON bodies

app.use("/api/v1/user", authRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running`);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
