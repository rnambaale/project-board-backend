
import config from '../db/config/config.js'
import nodeMailer from "nodemailer"

export const sendEmail = async (user,  token) => {


    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    let mailOptions = {
        to: user.email,
        subject: 'Reset your account password',
        html: '<h4><b>Reset Password</b></h4>' +
            '<p>To reset your password, complete this form:</p>' +
            '<a href=' + config.clientUrl + '/reset/' + user.id + '/' + token + '>' + 'link' + '</a>' +
            '<br><br>' +
            '<p>--Team</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

}


