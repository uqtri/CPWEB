import nodemailer from "nodemailer";
import filget from "figlet";
import chalk from "chalk";
// const nodemailer =

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export { transporter };
