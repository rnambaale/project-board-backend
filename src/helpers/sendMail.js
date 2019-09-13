// import sendMail from "sendmail"
import config from '../db/config/config.js'
import nodeMailer from "nodemailer"
// import mailer from '@sendgrid/mail'

// const { APP_URL, SENDER_EMAIL } = process.env()

// mailer.setApiKey(APP_URL)

export const sendEmail = async (user,  token) => {


    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'm16ayebare@gmail.com',
            pass: 'matopo7x'
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


    // let transporter = nodeMailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'xxx@xx.com',
    //         pass: 'xxxx'
    //     }
    // });
    // let mailOptions = {
    //     from: '"<jyothi pitta>" mark.ayebare@andela.com',
    //     to: user.email,
    //     subject: 'Reset your account password',
    //     html: '<h4><b>Reset Password</b></h4>' +
    //         '<p>To reset your password, complete this form:</p>' +
    //         '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
    //         '<br><br>' +
    //         '<p>--Team</p>'
    // }


    // mailer.send(mailOptions)


//     console.log(mailOptions, "00000000000")
//     let mailSent = await sendMail(mailOptions)
//     console.log(mailSent, "00000000000")
//     if (mailSent) {
// // console.log(mailSent)
//         return res.json({success: true, message: 'Check your mail to reset your password.'})
//     } else {
//         return res.status(400).json({
//             message: " Email not sent"
//         })
//     }
}


