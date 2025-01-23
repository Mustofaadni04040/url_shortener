import jwt from "jsonwebtoken";
import httpError from "http-errors";

const JWT_SECRET = process.env.JWT_PRIVATE_KEY as string;

export const generateToken = async (payload: { [key: string]: any }) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

export const validateJWt = async (token: string) => {
  try {
    const content = jwt.verify(token, JWT_SECRET);

    return content;
  } catch (error) {
    throw new httpError.Unauthorized("Please provide a valid token");
  }
};
