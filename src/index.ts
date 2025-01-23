import "dotenv/config";
import knex, { onDatabaseConnect } from "./config/knex";
import { login, register } from "./services/users";

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("Database is connected");
    // Database is ready
    // const user = await register({ username: "ucok", password: "1234556" });
    // console.log(user);

    const user = await login({ username: "ucok", password: "1234556" });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

main();
