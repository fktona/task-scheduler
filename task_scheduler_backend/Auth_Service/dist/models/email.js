import mongoose from "mongoose";
const emailSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    receiversMail: {
        type: String,
        required: true,
        trim: true,
    },
    receiversName: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['recurring', 'one-time'],
        required: true,
        trim: true
    }
}, { timestamps: true });
const Email = mongoose.model("Email", emailSchema);
export default Email;
