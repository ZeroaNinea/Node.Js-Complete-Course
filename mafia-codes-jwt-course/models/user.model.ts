import { DataTypes, Model } from "sequelize";

import { sequelize } from "../helpers/init_sequelize";

import bcrypt from "bcryptjs";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  public async isValidPassword(password: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, this.password);
    } catch (error: unknown) {
      throw error;
    }
  }
}

User.init(
  {
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
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
