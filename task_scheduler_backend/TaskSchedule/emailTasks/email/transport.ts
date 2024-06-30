import { Request , Response } from "express";
import Mailgen from 'mailgen';
import db from '../models';
const User  = db.user;

const {transporter} = require('./config');
const {senderMsg , receiversMsg} = require('./body');

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'AXE',
        link: 'https://documenter.getpostman.com/view/29260772/2s9YXmWfPQ'
    }
});

export const sendingMail = async (req:Request , res:Response) => {

const {email, name , message , senderName} = req.body;
const {id:senderID} = req.params;
const senderInfo = await User.findById(senderID);
console.log(senderInfo);

let userMailMsg = mailGenerator.generate(senderMsg(name , message , senderInfo?.email ,senderName));
let receiverMailMsg = mailGenerator.generate(receiversMsg(name , email , message , senderName));

let mailOptions = {
    from: 'sendspear@gmail.com',
    to: email,
    subject: 'Thanks For Reaching Out', 
    html: userMailMsg,
};

let mailOptions2 = {
    from: 'sendspear@gmail.com',
    to: senderInfo?.email,
    subject: `New Message From ${name}`	,
    html: receiverMailMsg,
};

await transporter.sendMail(mailOptions2 , (err:any , info:any) => {
    if(err) {
        res.status(500).json({
            status: 'error',
            message: 'Message not sent',
            messageInfo: err,
            
        })
    } else {
        res.status(200).json({
            status: 'success',
            message: 'Message sent successfully',
            messageInfo: info,
        })
        
    }
})

await transporter.sendMail(mailOptions , (err:any , info:any) => {
    if(err) {



          } else {
        
        
    }
})

}
