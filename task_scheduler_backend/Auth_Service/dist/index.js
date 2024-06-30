"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AUTH_1 = __importDefault(require("./routes/AUTH"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 1000;
app.use('/api/auth', AUTH_1.default);
models_1.default.mongoose
    .connect('mongodb+srv://adetonafk:FaithTask@taskscheduler.wryp8pz.mongodb.net/?retryWrites=true&w=majority&appName=TaskScheduler')
    .then(() => {
    console.log("Successfully connect to MongoDB.");
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error("Connection error", err);
    process.exit();
});
exports.authService = app;
