import jwt from "jsonwebtoken";
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
