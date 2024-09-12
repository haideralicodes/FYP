const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

const sendResetPasswordEmail = (email, token) => {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
