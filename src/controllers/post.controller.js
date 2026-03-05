import Post from "../models/Post.js";
import AppError from "../utils/AppError.js";

export const createPost = async (req, res, next) => {
    try {
        const {title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user.id
        });
        res.status(201).json({
            message: "Post created successfully", post
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        // populate() → replaces author ID with user info
        const posts = await Post.find().populate("author", "name email");

        res.json(posts);
    } catch(error) {
        next(error);
    }
};
export const getMyPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ 
            author: req.user.id // come from JWT middlewatr
        });
        res.json(posts);       
    } catch (error){
           next(error);
    }
};
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return next(new AppError('Post not found', 404));
        }

        // AUTHORIZATION CHECK ( can this person do the change )
        if (post.author.toString() !== req.user.id) {
            return next(new AppError('Not allowed', 403));
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.json({
            message: "Post updated successfully", post
        });

    } 
    catch (error) {
        next(error);
    }
};

export const deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return next(new AppError('Post not found', 404));
        }

        // AUTHORIZATION CHECK 
        if (post.author.toString() !== req.user.id) {
            return next(new AppError('Not allowed', 403));
        }
        await post.deleteOne();

        res.json({
            message: "Post deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};