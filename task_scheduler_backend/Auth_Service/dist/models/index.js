"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const email_1 = __importDefault(require("./email"));
mongoose_1.default.Promise = global.Promise;
const db = {
    mongoose: mongoose_1.default,
    user: user_1.default,
    email: email_1.default
};
exports.default = db;
