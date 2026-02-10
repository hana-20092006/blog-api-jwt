// reusable helpers
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "30s" } 
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d"}
    );
};