import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { Id, IUser, PublicUser, UserDTO } from "../types/types";
import { NextFunction, Request, Response } from "express";
import { userSchema } from "../utils/DTOs";
import { ValidationException, ConflictException } from "../config/exceptions";
import { loginInput } from "../utils/DTOs";
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = loginInput.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
            throw new ValidationException(errorMessages, "login validation failed");
        }
        const { username,email, password } = result.data;
        if (!username && !email) {
            throw new ValidationException("username or email is required", "login validation failed");
        }
        const user = await User.login(username ||email || "", password);
   
        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "production",
        });
        const pubUser: PublicUser = {
            username: user.username,
            email: user.email,
            fullname: user.fullName
        };
        res.status(200).json({ user: pubUser });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
            throw new ValidationException(errorMessages, "user validation failed");
        }
        const userData: UserDTO = result.data;
        const existingUser: IUser | null = await User.findOne({
            $or: [
                { email: userData.email },
                { username: userData.username },
                { fullName: userData.fullname }
            ]
        });
        if (existingUser) {
            throw new ConflictException("user already exists", "User");
        }
        const user: IUser = await User.create(userData);
        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "production",
        });
        const pubUser: PublicUser = {
            username: user.username,
            email: user.email,
            fullname: user.fullName
        };
        res.status(200).json({ user: pubUser });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "logged out" });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
}