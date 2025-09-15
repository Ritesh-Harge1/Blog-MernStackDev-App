import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.json({ status: "OK", message: "Blog-MernStack-App API" }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// DB + Server
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error("Missing MONGO_URI in environment");
  process.exit(1);
}

mongoose
  .connect(DB_URI, { dbName: "blog_app" })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
