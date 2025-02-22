import './config/exceptions'; // Import global exceptions
import globalErrorHandler from './middlewares/errorHandler';
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config as configDotenv } from "dotenv";
import mongoose from "mongoose";
import { ioServer } from "./websockets";
import http from "http";
import authRouter from "./routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

configDotenv();

const api: Express = express();
const server = http.createServer(api);

// Middleware
api.use(express.json());
api.use(cookieParser());
api.use(cors());
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Add Swagger UI middleware

console.log(process.env.DB_CONNECTION_STRING);
api.get("/", (_, res) => res.send("Server is running"));

mongoose
    .connect(process.env.DB_CONNECTION_STRING as string, {
        dbName: "chat-app",
        serverSelectionTimeoutMS: 10000 // Increase timeout to 10 seconds
    })
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("Connected to DB & running on port:", process.env.PORT || 8000);
        });
    })
    .catch((err) => { throw new BaseException(err.message, "DB Connection") });

export const io = ioServer(server);

api.use("/auth", authRouter);

// Global error handler should be the last middleware
api.use(globalErrorHandler);