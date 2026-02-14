import { body } from "express-validator";

export const createPostValidation = [
    // isEmpty() means must be empty
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required")
];

export const updatePostValidation = [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("content").optional().notEmpty().withMessage("Content cannot be empty")
];