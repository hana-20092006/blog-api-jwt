// controller = receptionist = receives the request, processes it, and sends a response

import User from "../models/User.js"; // User → the manager you created earlier
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import jwt from "jsonwebtoken";

// “If someone hits the register endpoint, just reply.”
export const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body; 

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
        res.status(500).json({
            message: "Error registering user", 
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
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
        res.status(500).json({
            error: error.message
        });
    }
};

// Not protected by It’s not protected by authMiddleware
// because: the access token is already expired
// we rely on the refresh token instead
export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // If you didn’t send a refresh token, I can’t help you.
        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required"
            });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({
                message: "Invalid refresh token"
            });
        }

        // this checks token signature, expiry, integrity
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, 
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        message: "Invalid refresh token" 
                    });
                }
                const newAccessToken = generateAccessToken(user._id);

                res.json({
                    accessToken: newAccessToken
                });
            }

        );
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

// revoke the refresh token
export const logoutUser = async (req, res) => {
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
        res.status(500).json({
            message: error.message
        });
    }
};
