import nodemailer = require("nodemailer");



let sendEmail = async (email: string) => {

  console.log("here");
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "alaa.tharrwat@gmail.com", // generated ethereal user
        pass: process.env.EmailPassword, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: "Backend",
      to: email,
      subject: "Notification!",
      text: "Email changed",
    });

    return true;
  } catch (error) {
    throw error
  }
};
export default sendEmail;
