const nodemailer = require("nodemailer");
const {email_subject, initial_phrase_email} = require("./config");



async function sendEmail(sendTo) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: process.env.TYPE,
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
   try {
     const info =  await transporter.sendMail({
           from:'Victor Carrilho <victor.carrilho.dev@gmail.com>',
           to: `${sendTo[0].email}`,
           subject: email_subject,
           html: `<b>${initial_phrase_email} ${sendTo[1].name}</b>`, // html body*/
       });
       console.log("email sent to ",sendTo[0].email);
   }
   catch (e) {
       console.log(e);
       console.log("problems in sending email to ",sendTo[0].email);
   }

}

module.exports = {
    sendEmail:sendEmail
}



