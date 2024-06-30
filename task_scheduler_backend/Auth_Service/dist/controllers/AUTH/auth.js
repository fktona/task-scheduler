"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = __importDefault(require("../../models"));
const User = models_1.default.user;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing ${missingFields} in the request body`
        });
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePassword = (password) => {
        // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const re = /^[a-zA-Z0-9]{6,}$/;
        return re.test(password);
    };
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (!emailError) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }
    if (!passwordError) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }
    try {
        // Check if the email already exists in the database
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const userData = {
                email: email,
                password: hashedPassword,
                verification: false
            };
            const user = yield User.create(userData);
            // await user.setRoles(userRole);
            // res.status(200).json({
            //     message: "User registered successfully",
            // });
            next();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error registering user"
        });
    }
});
exports.default = register;
