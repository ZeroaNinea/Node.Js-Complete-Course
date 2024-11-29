import {
  INTEGER,
  STRING,
  Model,
  BOOLEAN,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public username!: string;
  public hash!: string;
  public salt!: string;
  public admin!: boolean;
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
      validate: {
        len: [3, 50], // Username must be between 3 and 50 characters
      },
    },
    hash: {
      type: STRING,
      allowNull: false,
    },
    salt: {
      type: STRING,
      allowNull: false,
    },
    admin: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "User" }
);

sequelize.sync();

export default User;
