const nodemailer = require("nodemailer");



// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(sendTo) {
    // Generate test SMTP service account from ethereal.email
    // ethernal smtp is a fake smtp that never deliver an email , just to test the html inside the email.
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Babbo natale segreto 👻" <babbonatale@gmail.com>', // sender address, // sender address
        to: `${sendTo[0].email}`, // list of receivers
        subject: "ASSEGNAZIONE BABBO NATALE SEGRETO", // Subject line
        text: "hello", // plain text body
        html: `<b>DEVI FAJE N'BER REGALO A ${sendTo[1].name}</b>`, // html body*/
       /*
         // list of receivers
        subject: "ASSEGNAZIONE BABBO NATALE SEGRETO", // Subject line
        text: "hello", // plain text body
        html: `<b>${sendTo[1].name}</b>`, // html body*/
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    sendEmail:sendEmail
}



