import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const parseJwt = (token) => {
  if (!token) return null;

  const payload = token.split(".")[1];
  const signature = token.split(".")[2];

  if (!payload || !signature) return null;

  const result = jwt.verify(token, process.env.JWT_SECRET);

  if (result) {
    return result;
  }
  return null;
};
export { parseJwt };
