import { Model, INTEGER, STRING } from "sequelize";
import sequelize from "../connection/database";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  public getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

User.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [3, 50],
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

sequelize
  .sync()
  .then((data) => {
    console.log("Table synced successfully!", data);
  })
  .catch((err) => {
    console.error("Error syncing the table: ", err);
  });

export default User;
