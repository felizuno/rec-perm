const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'recpermmailer@gmail.com',
    pass: process.env.GMAIL_PW
  }
});

module.exports = (notificationContent) => {
  if (process.env.GMAIL_PW) {

    const mailOptions = {
      from: 'recpermmailer@gmail.com',
      to: process.env.NOTIFICATION_RECIPIENT,
      subject: 'HEY BRO PERMITS!!!!!',
      text: JSON.stringify(notificationContent)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};
