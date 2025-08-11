import { loginWithGoogle } from "../services/auth.js";
export const redirectToGoogleAuth = (req, res) => {
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  console.log(process.env.GOOGLE_REDIRECT_URL);
  const url = `${process.env.GOOGLE_AUTH_URI}?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${
    process.env.GOOGLE_REDIRECT_URL
  }&response_type=code&scope=${SCOPES.join(" ")}`;
  console.log("Redirecting to Google Auth URL:", url);
  return res.redirect(url);
};
export const handleGoogleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    console.log("Google auth code:", code);
    const token = await loginWithGoogle(code);
    // res.setHeader(
    //   "Set-Cookie",
    //   `jwt=${token}; HttpOnly; Path=/; Max-Age=432000; SameSite=None; Secure`
    // );
    console.log(token, "@@@");

    return res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    // return res.redirect(process.env.FRONTEND_URL);
  }
};

export default {
  handleGoogleCallback,
  redirectToGoogleAuth,
};
