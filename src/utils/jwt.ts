import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { Id } from '../types/types';
configDotenv();

const generateAccessToken = (userId: string) => {
    const payload = { userId }; // Ensure payload is a plain object
    return jwt.sign(payload, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
};

const generateRefreshToken = (userId: string) => {
    const payload = { userId }; // Ensure payload is a plain object
    return jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
};

export { generateAccessToken, generateRefreshToken };

export const verifyToken = (token: string, secret: string): string | jwt.JwtPayload => {
    return jwt.verify(token, secret);
}

export const getAccessToken = (req: any): string => {
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
}
export const getRefreshToken = (req: any): string => {
    const refreshToken = req.cookies['refreshToken'];
    return refreshToken;
}