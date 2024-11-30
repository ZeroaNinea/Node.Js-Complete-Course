import {
  INTEGER,
  STRING,
  Model,
  BOOLEAN,
  UUID,
  UUIDV4,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: string;
  public username!: string;
  public hash!: string;
  public salt!: string;
  public admin!: boolean;
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
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
