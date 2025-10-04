import userService from "../services/user.js";
import jwt from "jsonwebtoken";
import { uploadStream } from "../libs/cloudinary.js";
import e from "express";
export const loginWithGoogle = async (authorization_code) => {
  const data = await fetch(process.env.GOOGLE_TOKEN_URI, {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: authorization_code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: "authorization_code",
    }),
  }).then((response) => response.json());

  const userData = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  ).then((response) => response.json());
  console.log(data, "data");

  const foundUser = await userService.getUserByEmail(userData.email);
  let token;
  if (!foundUser) {
    const user = {
      email: userData.email,
      avatarUrl: userData.picture,
      fullName: userData.name,
      username: userData.email.split("@")[0],
      isActive: true,
    };
    const imgBuffer = await fetch(userData.picture).then((res) =>
      res.arrayBuffer()
    );
    const url = await uploadStream(Buffer.from(imgBuffer));
    user.avatarUrl = url.secure_url;
    const createdUser = await userService.createUser(user);
    token = jwt.sign(createdUser, process.env.JWT_SECRET);
  } else {
    token = jwt.sign(foundUser, process.env.JWT_SECRET);
  }
  return token;
};

const handleActivation = async ({ email, token }) => {
  const request = await requestService.getRequestByToken({
    token,
    type: "activate_account",
  });
  if (request.email !== email) {
    throw new Error("Token không hợp lệ");
  }
  if (request.isUsed) {
    throw new Error("Token đã được sử dụng");
  }
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error("Không tìm thấy người dùng");
  }
  if (user.isActive) {
    throw new Error("Tài khoản đã được kích hoạt");
  }
  await userService.updateUser(user.id, { isActive: true });
  await requestService.deleteRequest(token);
  return true;
};
const handleChangePassword = async ({ email, token, newPassword }) => {
  const request = await requestService.getRequestByToken({
    token,
    type: "change_password",
  });
  if (request.email !== email) {
    throw new Error("Token không hợp lệ");
  }
  if (request.isUsed) {
    throw new Error("Token đã được sử dụng");
  }
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error("Không tìm thấy người dùng");
  }
  await userService.updateUser(user.id, { password: newPassword });
  await requestService.deleteRequest(token);
  return true;
};

export default { loginWithGoogle, handleActivation, handleChangePassword };
