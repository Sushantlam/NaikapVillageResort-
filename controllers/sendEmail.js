const nodemailer = require('nodemailer');

async function sendEmail(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'sushantlama732@gmail.com',
        pass: 'zpxsjrfthoxuebra',
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: 'sushantlama732@gmail.com',
      subject: req.body.subject,
      html: req.body.textarea,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Email sending failed');
  }
}

module.exports = { sendEmail };
