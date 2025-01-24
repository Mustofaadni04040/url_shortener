import "dotenv/config";
import Koa from "koa";
import { onDatabaseConnect } from "./config/knex";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import router from "./routes/index";
// import { login, register } from "./services/users";

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("Database is connected");
    // Database is ready
    // const user = await register({ username: "ucok", password: "1234556" });
    // console.log(user);

    // const user = await login({ username: "ucok", password: "1234556" });
    // console.log(user);
    app.listen(Number(process.env.PORT), () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

main();
