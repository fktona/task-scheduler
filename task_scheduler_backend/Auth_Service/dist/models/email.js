"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailSchema = new mongoose_1.default.Schema({
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
const Email = mongoose_1.default.model("Email", emailSchema);
exports.default = Email;
