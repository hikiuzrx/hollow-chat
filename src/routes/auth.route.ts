import express, { Router } from "express";
import { login, register, logout, updateProfile } from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
const router: Router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: The user's email or username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               username:
 *                 type: string
 *                 description: The user's username
 *               fullname:
 *                 type: string
 *                 description: The user's full name
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Conflict (user already exists)
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post("/logout", logout);

router.patch("/update-profile",isAuthenticated,updateProfile)

export default router;