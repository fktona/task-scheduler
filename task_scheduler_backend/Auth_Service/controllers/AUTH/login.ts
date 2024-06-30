import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { Request, Response ,NextFunction } from 'express';
import { UserRegistration } from '@types';
import db from '../../models';
const User = db.user;


const login = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required." });
    }

    const user = await User.findOne({ email });

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

    
    let {_doc}:{_doc:any} = user as any;

    const { password:userPassword, ...userWithoutPassword } = _doc;

return res.status(200).json({
  ...userWithoutPassword, accessToken: token,
  message: "Login successful.",
});


    return res.status(200).json({
      ..._doc , accessToken: token,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default login;