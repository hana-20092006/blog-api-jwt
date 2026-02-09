// controller = receptionist = receives the request, processes it, and sends a response

import User from "../models/User.js"; // User → the manager you created earlier
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

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

        // 3> Successful login
        const token = generateToken(user._id);
        res.json({
            message: "Login successful", token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
