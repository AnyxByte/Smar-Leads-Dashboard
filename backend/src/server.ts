import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "";

app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

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

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to launch server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
