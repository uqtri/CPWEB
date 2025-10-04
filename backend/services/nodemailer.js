import { transporter } from "../config/nodemailer.js";
import { prisma } from "../prisma/prisma-client.js";
import { randomString } from "../utils/randomString.js";
import requestService from "./request.js";
const sendChangePasswordEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      OR: [{ email }, { username: email }],
    },
  });
  if (!user) {
    throw new Error("Không tìm thấy người dùng với email hoặc tên đăng nhập");
  }
  const token = randomString(32);
  await requestService.createRequest({
    email: user.email,
    token,
    type: "change_password",
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Thay đổi mật khẩu",
    text: `Bạn đã yêu cầu thay đổi mật khẩu. Nhấn vào liên kết bên dưới để tiếp tục:\n\n${process.env.FRONTEND_URL}/change-password?email=${email}&token=${token} \n\nNếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.`,
  };
  await transporter.sendMail(mailOptions);
};
const sendActivationEmail = async (email) => {
  console.log(email, "email");

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username: email }],
    },
  });
  if (!user) {
    throw new Error("Không tìm thấy người dùng với email hoặc tên đăng nhập");
  }
  const token = randomString(32);
  await requestService.createRequest({
    email: user.email,
    token,
    type: "activate_account",
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Kích hoạt tài khoản",
    text: `Chào mừng! Vui lòng kích hoạt tài khoản của bạn bằng cách nhấp vào liên kết bên dưới:\n\n${process.env.FRONTEND_URL}/activate?email=${email}&token=${token} \n\nNếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.`,
  };
  await transporter.sendMail(mailOptions);
};

export default { sendActivationEmail, sendChangePasswordEmail };
