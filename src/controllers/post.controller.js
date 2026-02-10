import Post from "../models/Post.js";

export const createPost = async (req, res) => {
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
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        // populate() → replaces author ID with user info
        const posts = await Post.find().populate("author", "name email");

        res.json(posts);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ 
            author: req.user.id // come from JWT middlewatr
        });
        res.json(posts);       
    } catch (error){
            res.json(500).json({
                message: error.message
        });
    }
};
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // AUTHORIZATION CHECK ( can this person do the change )
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not allowed"
            });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.json({
            message: "Post updated successfully", post
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error updating post", error
        });
    }
};

export const deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // AUTHORIZATION CHECK 
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not allowed"
            });
        }
        await post.deleteOne();

        res.json({
            message: "Post deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting post", error
        });
    }
};