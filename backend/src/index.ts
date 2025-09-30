import "reflect-metadata"; // Required for TypeORM
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "../ormconfig";
import authRoutes from "./routes/auth.rou";
import projectRoutes from "./routes/project.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Initialize TypeORM Data Source
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Register routes
    app.use("/auth", authRoutes);
    app.use("/projects", projectRoutes);

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });