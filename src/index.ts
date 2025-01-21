import "dotenv/config";
import { onDatabaseConnect } from "./config/knex";

onDatabaseConnect()
  .then(() => console.log("Database is connected"))
  .catch((e) => {
    console.error("Database connection failed");
    console.error(e);
  });
