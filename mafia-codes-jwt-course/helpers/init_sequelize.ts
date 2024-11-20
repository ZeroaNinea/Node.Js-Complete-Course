import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to the \`${DB_NAME}\` database succussful!`);
  })
  .catch((err: Error) => {
    console.log("Error connecting to database!");
  });
