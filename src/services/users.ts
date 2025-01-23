import { comparePassword, hashPassword } from "../config/encryption";
import { generateToken } from "../config/jwt";
import knex from "../config/knex";
import { validateLogin, validateRegister } from "./validations";
import httpError from "http-errors";

const getUser = async (username: string) =>
  await knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first();

export const register = async (body: {
  username: string;
  password: string;
}) => {
  validateRegister(body);

  const current_user = await getUser(body.username);

  if (current_user) {
    throw new httpError.Conflict("Username is already exists");
  }

  const user = (
    await knex("users").insert(
      {
        username: body.username.toLowerCase(),
        password: await hashPassword(body.password),
      },
      ["id", "username"] // return id and username only
    )
  )[0];

  return user;
};

export const login = async (body: { username: string; password: string }) => {
  validateLogin(body);

  const user = await getUser(body.username);

  if (!user) {
    throw new httpError.Unauthorized("Username or Password are incorrect");
  }

  const isPasswordMatch = await comparePassword(body.password, user.password);

  if (!isPasswordMatch) {
    throw new httpError.Unauthorized("Username or Password are incorrect");
  }

  const token = await generateToken({ id: user.id });

  return {
    user: {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    token,
  };
};
