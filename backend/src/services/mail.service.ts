import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL_USER!;
const PASS = process.env.EMAIL_PASS!;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: EMAIL,
    pass: PASS, // app password recommended
},
});

export async function sendOtpMail(to: string, otp: string) {
    const mailOptions = {
        from: EMAIL,
        to,
        subject: "Your OTP Code",
        text: `Your verification code: ${otp}`,
    };

    return transporter.sendMail(mailOptions);
}
