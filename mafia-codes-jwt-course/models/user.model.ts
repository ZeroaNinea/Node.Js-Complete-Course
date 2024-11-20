import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/init_sequelize";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
