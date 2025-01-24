import { RouterContext } from "@koa/router";
import { Next } from "koa";
import httpError from "http-errors";
import { validateJWt } from "../config/jwt";

export const requireAuthHandler = async (ctx: RouterContext, next: Next) => {
  const header = ctx.request.headers.authorization;

  if (!header) {
    throw new httpError.Unauthorized("Please provide a valid token");
  }

  const token = header.split(" ")[1];
  const tokenPayload = await validateJWt(token);
  ctx.state.user_id = tokenPayload.id;

  await next();
};
