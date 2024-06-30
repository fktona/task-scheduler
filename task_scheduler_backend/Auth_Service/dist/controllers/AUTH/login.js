var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import db from '../../models';
const User = db.user;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required." });
        }
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password." });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            expiresIn: config.tokenExpiration || '24h',
        });
        let { _doc } = user;
        const { password: userPassword } = _doc, userWithoutPassword = __rest(_doc, ["password"]);
        return res.status(200).json(Object.assign(Object.assign({}, userWithoutPassword), { accessToken: token, message: "Login successful." }));
        return res.status(200).json(Object.assign(Object.assign({}, _doc), { accessToken: token, message: "Login successful." }));
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
export default login;
