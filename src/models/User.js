// post schema
// Schema = blueprint
// model = Model = usable object built from that blueprint

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, 
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema); // 

export default User;