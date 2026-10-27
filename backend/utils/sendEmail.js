
import "dotenv/config";
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, "");

  if (!emailUser || !emailPass) {
    throw new Error(
      "EMAIL_USER or EMAIL_PASS is missing. Check your backend .env file."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM?.trim() || emailUser,
    to,
    subject,
    text,
    html,
  });
};