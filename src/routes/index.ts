import Router from "@koa/router";
import authRouter from "./auth";
import urlRouter from "./urls";
import { requireAuthHandler } from "./middlewares";
import visitsRouter from "./visits";
import { resolveURL } from "../services/urls";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

router.use(
  "/urls",
  requireAuthHandler,
  urlRouter.routes(),
  urlRouter.allowedMethods()
);

router.use(
  "/visits",
  requireAuthHandler,
  visitsRouter.routes(),
  visitsRouter.allowedMethods()
);

router.get("/:id", async (ctx) => {
  const url = await resolveURL(ctx.params.id, ctx.request.ip);
  ctx.redirect(url);
});

export default router;
