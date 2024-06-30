import { UserRegistration } from '@types';
import bcrypt from 'bcryptjs';
import db from '../../models';
import { Request, Response , NextFunction} from 'express';



const User = db.user;

type UserInfo = Omit<UserRegistration ,"id" |"token">
const register = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const requiredFields = [ 'email', 'password'];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing ${missingFields} in the request body`
        });
    }

    const validateEmail = (email: Pick<UserRegistration , 'email'>) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password:string) => {
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
        const existingUser = await User.findOne({email })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }else{
            
        

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData:UserInfo = {
            email: email,
            password: hashedPassword,
            verification: false
        }

        const user = await User.create(userData);
        // await user.setRoles(userRole);
        // res.status(200).json({
        //     message: "User registered successfully",
        // });
        next()

   } } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error registering user"
        });
    }
  
}

export default register;