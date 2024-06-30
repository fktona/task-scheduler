import mongoose from "mongoose";
const User = mongoose.model("User", new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    verification: {
        type: Boolean,
        required: true
    }
}, { timestamps: true }));
export default User;
