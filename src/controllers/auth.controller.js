// controller = receptionist = receives the request, processes it, and sends a response

import User from "../models/User.js"; // User → the manager you created earlier
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

// “If someone hits the register endpoint, just reply.”
export const registerUser = async (req,res, next) => {
    try {
        const { name, email, password } = req.body; 

        // Check if user already exists
        const existingUser = await User.findOne( {email});
        if (existingUser) {
            return next(new AppError('Email already registered.',409));
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // await → Wait till MongoDB finishes saving
        const user = await User.create({ // User.create() → Hey manager, add a new resident
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully", user
        });
    } catch(error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('Invalid email or password', 401));
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new AppError('Invalid email or password', 401));
        }

        // 3. Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to DB
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            message: "Login successful", accessToken, refreshToken
        });
    } catch (error) {
        next(error);
    }
};

// Not protected by It’s not protected by authMiddleware
// because: the access token is already expired
// we rely on the refresh token instead
export const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        // If you didn’t send a refresh token, I can’t help you.
        if (!refreshToken) {
            return next(new AppError('Refresh token is required', 401));
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return next(new AppError('Invalid refresh token', 403));
        }

        // this checks token signature, expiry, integrity
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, 
            (err, decoded) => {
                if (err) {
                    return next(new AppError('Invalid refresh token', 403));
                }
                const newAccessToken = generateAccessToken(user._id);

                res.json({
                    accessToken: newAccessToken
                });
            }

        );
    }
    catch(error){
        next(error);
    }
};

// revoke the refresh token
export const logoutUser = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        const user = await User.findOne({ refreshToken});
        if (user){
            user.refreshToken = null;
            await user.save();
        }

        res.json({
            message: "Logged out successfully"
        });
    } catch (error){
        next(error);
    }
};
