const { Sequelize, DataTypes, Model } = require("sequelize");

require("dotenv").config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});

User.sync()
  .then(() => {
    console.log("`User` table and model synced successfully!");
  })
  .catch((err: Error) => {
    console.log("Error syncing the `User` table and model!");
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err: Error) => {
    console.log("Error connecting to database!");
  });

module.exports = User;
