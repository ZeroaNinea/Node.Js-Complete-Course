import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, HOST } = process.env;
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;
const PORT = parseInt(process.env.PORT!) || 3000;

const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: HOST,
  port: DB_PORT,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connection to the \`${DB_NAME}\` database succussful on port ${DB_PORT}!`
    );
  })
  .catch((err: Error) => {
    console.log(`Error connecting to database: ${err}`);
  });

export default sequelize;
