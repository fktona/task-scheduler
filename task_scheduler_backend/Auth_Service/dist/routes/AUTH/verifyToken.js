"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const refresh_1 = require("../../middlewares/refresh");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/protected', refresh_1.verifyToken, refresh_1.protectedRoute);
exports.default = router;
