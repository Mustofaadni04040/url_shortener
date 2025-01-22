import "dotenv/config";
import knex, { onDatabaseConnect } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("Database is connected");
    // Database is ready
  } catch (error) {
    console.log(error);
  }
};

main();
