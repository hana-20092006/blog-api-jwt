import express from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Create a door called /register
// When someone knocks, call registerUser

const router = express.Router(); // Create a mini Express app whose only job is to handle routes.

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get(path, middleware, handler) , handler runs only if middleware allows
router.get("/profile", authMiddleware, (req, res) => { // Create a route called /profile, only allow access if the user is authenticated.
    res.json({
        message: "Access granted",
        user: req.user
    });
});

router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);
export default router;