import { INTEGER, STRING, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public hash!: string;
  public salt!: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    hash: {
      type: STRING,
      allowNull: false,
    },
    salt: {
      type: STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);

export default User;
