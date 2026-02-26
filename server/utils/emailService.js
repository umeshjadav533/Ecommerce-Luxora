import nodemailer from 'nodemailer'
import ErrorHandler from '../middlewares/errorMiddleWare.js';

const sendEmail = async ({ to, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            service: process.env.SMTP_SERVICE
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: message
        }

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        return next(new ErrorHandler(error.message || "Cannot sent email", 404));
    }
}

export default sendEmail;