"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../controllers/AUTH/auth"));
const login_1 = __importDefault(require("../../controllers/AUTH/login"));
const refresh_1 = require("../../middlewares/refresh");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', auth_1.default, login_1.default);
router.post('/signin', login_1.default);
//router.post('/signout' , register)
router.get('/refresh', refresh_1.verifyToken, refresh_1.protectedRoute);
exports.default = router;
