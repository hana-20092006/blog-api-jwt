import { body } from "express-validator";

export const registerValidation = [
    body("name")
    .notEmpty().withMessage("Name is required"),

    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain a uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain a number")

];

export const loginValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
];