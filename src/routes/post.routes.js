import express from 'express';
import { createPost, getAllPosts, getMyPosts, updatePost, deletePost} from '../controllers/post.controller.js';
import authMiddleware from '../middleware/auth.middleware.js'; // security guard that checks JWT, decides if user is allowed 
import { createPostValidation, updatePostValidation } from "../validators/post.validator.js";
import validate from "../middleware/validation.middleware.js"

const router = express.Router(); // creation of route(door)

// public (reading blogs should be allowed for everyone)
router.get("/", getAllPosts); 

// protected 
router.post("/", authMiddleware, createPostValidation, validate, createPost); // to create a post, you must login
router.get("/my-posts", authMiddleware, getMyPosts);
router.put("/:id", authMiddleware, updatePostValidation, validate, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;