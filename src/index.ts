import './config/exceptions'; // Import global exceptions

import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config as configDotenv } from "dotenv";
import mongoose from "mongoose";
import { ioServer } from "./websockets";
import http from "http";

configDotenv();

const api: Express = express();
const server = http.createServer(api);
export const io = ioServer(server);

// Middleware
api.use(express.json());
api.use(cookieParser());
api.use(cors());

api.get("/", (_, res) => res.send("Server is running"));

mongoose
    .connect(process.env.DB_CONNECTION_STRING as string, {
        dbName: "chat-app",
        serverSelectionTimeoutMS: 3000
    })
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("Connected to DB & running on port:", process.env.PORT || 8000);
        });
    })
    .catch((err) =>{ throw new ConflictException(err.message, "DB Connection")});
