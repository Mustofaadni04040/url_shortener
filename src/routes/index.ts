import Router from "@koa/router";
import authRouter from "./auth";
import urlRouter from "./urls";
import { requireAuthHandler } from "./middlewares";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

router.use(
  "/urls",
  requireAuthHandler,
  urlRouter.routes(),
  urlRouter.allowedMethods()
);

router.use("/visits");

export default router;
