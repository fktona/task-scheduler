export const senderMsg = ({name , message , userMail , userName}: {name: string, message: string, userMail: string, userName: string}) => {
    return {
        body: {
            name: name,
            intro: `Thank you for contacting ${userName}.`,
            outro: `Your message has been received by ${userMail}.` ,
            signature: 'Thanks for using SendSpear services',

        }
    }; 
};

export const receiversMsg = (name: string, email: string, message: string, userName: string) => {
    return {
        body: {
            name: userName,
            intro: `You have a new message from ${name} with email ${email}.`,
            instructions: 'You can check the message below',
            outro: `Message: ${message}`,
            signature: 'Thanks for using SendSpear services',
            
        }
    };
};