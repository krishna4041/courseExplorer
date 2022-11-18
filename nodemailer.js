var node_mailer = require('nodemailer');


var email = "krishna.5053@gmail.com"
var pass = "ksyexbcoamvvqdms"

let transporter = node_mailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pass
    }
  });


let mailOptions = {
    from: 'krishna.5053@gmail.com',
    to: "kenug001@fiu.edu",
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
  };

transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });