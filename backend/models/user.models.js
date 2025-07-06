import mongoose from "mongoose";

// Schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    assistantName: {
        type: String
    },
    assistantImage: {
        type: String
    },
    // history stores the conversation history between user and assistant
    history: [
        { type: String }
    ]
}, { timestamps: true });

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
