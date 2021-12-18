const nodemailer = require("nodemailer");



// async..await is not allowed in global scope, must use a wrapper
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
           from:'Victor Carrilho <victor.carrilho.dev@gmail.com>', // sender address, // sender address
           to: `${sendTo[0].email}`, // list of receivers
           subject: "BABBO NATALE SEGRETO", // Subject line
          // text: "FROM victor.carrilho.dev@gmail.com TO victorcarrilho94@hotmail.it", // plain text body
           html: `<b>DEVI FAJE N'BER REGALO A ${sendTo[1].name}</b>`, // html body*/
       });
       //console.log(info);
       console.log("email inviata a ",sendTo[0].email);
   }
   catch (e) {
       console.log(e);
       console.log("problemi invio mail a ",sendTo[0].email);
   }

}

module.exports = {
    sendEmail:sendEmail
}



