import nodemailer from "nodemailer";
import filget from "figlet";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

console.log(
  process.env.SMTP_HOST,
  process.env.SMTP_PORT,
  process.env.SMTP_USER,
  process.env.SMTP_PASSWORD
);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
});
console.log(transporter.verify(), "transporter");
export { transporter };
