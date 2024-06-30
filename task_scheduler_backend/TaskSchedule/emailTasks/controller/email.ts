import { Request, Response } from 'express';
import { sendingMail } from '../email/transport';
import db from '../models';
const Email = db.email;

export const message = async (req:Request , res:Response) => {
    const { name , email , message , method } = req.body; 
   
    
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid email address',
        });
    }

    if(!name || !email || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Please fill all fields',
        })
    }   


 await sendingMail(req , res);

    const newEmail = new Email({
        senderID: req.params.id,
        receiversMail: email,
        receiversName: name,
        type: method,
        message,
    });

    newEmail.save()
    .then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Message sent successfully',
        });
    })
    .catch((err) => {
        res.status(500).json({
            status: 'error',
            message: 'Message not sent',
            messageInfo: err,
        });
    });

 
    
}


