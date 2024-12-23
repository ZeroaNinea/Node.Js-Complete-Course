import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DIALECT, TEST_DIALECT, HOST } =
  process.env;
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;

const sequelize =
  process.env.NODE_ENV === "test"
    ? new Sequelize(`${TEST_DIALECT}::memory`, { logging: false })
    : new Sequelize(
        `${DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`
      );

if (process.env.NODE_ENV !== "test") {
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
}

export default sequelize;
