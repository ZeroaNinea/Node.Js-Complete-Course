import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, HOST } = process.env;
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;
const PORT = parseInt(process.env.PORT!) || 3000;

const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
});

export default sequelize;
