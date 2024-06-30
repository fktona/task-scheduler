import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user:'sendspear@gmail.com',
        pass:process.env.PASS
    } 
});



module.exports = {
    transporter,
}