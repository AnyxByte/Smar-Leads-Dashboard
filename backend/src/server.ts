import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Server started successfully" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Runtime Exception:", err.stack);
  res.status(500).json({
    success: false,
    message: "Server runtime error encountered.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
