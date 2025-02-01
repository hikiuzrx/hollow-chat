import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { setUpWebSocketServer } from "./websoeckts" // Fix import path
import globalErrorHandler from "./middlewares/errorHandler";

configDotenv();

const api: Express = express();
const server = http.createServer(api); // Create HTTP server

// Middleware
api.use(express.json());
api.use(cookieParser());
api.use(cors());


api.get("/", (_, res) => res.send("Server is running"));

// Connect to MongoDB
mongoose
    .connect(process.env.DB_CONNECTION_STRING as string, { dbName: "chat-app", serverSelectionTimeoutMS: 3000 })
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("Connected to DB & running on port:", process.env.PORT || 8000);
        });
    })
    .catch((err) => console.error("Database connection error:", err));

// Initialize WebSocket server
setUpWebSocketServer(server);
api.use(globalErrorHandler);
