import { getAccessToken, getRefreshToken, verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { IUser, AuthenticatedRequest } from "../types/types";
import { UnauthorizedException, NotFoundException } from "../config/exceptions";

async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const accessToken = getAccessToken(req);
    const refreshToken = getRefreshToken(req);

    if (!accessToken && !refreshToken) {
        return next(new UnauthorizedException("No tokens provided", "auth"));
    }

    try {
        const data = verifyToken(accessToken, process.env.ACCESS_SECRET as string) as any;
        req.user = await User.findById(data.userId) as IUser;
        return next();
    } catch (error) {
        try {
            const data = verifyToken(refreshToken, process.env.REFRESH_SECRET as string) as any;
            const user = await User.findById(data.userId) as IUser;
            if (!user) {
                return next(new NotFoundException("No user with this ID", "auth"));
            }
            req.user = user;
            return next();
        } catch (error) {
            return next(new UnauthorizedException("Invalid refresh token", "auth"));
        }
    }
}

export default isAuthenticated;