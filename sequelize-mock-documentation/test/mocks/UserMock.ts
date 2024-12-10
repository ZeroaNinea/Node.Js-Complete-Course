import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock(); // Initialize mock database.

const UserMock = dbMock.define(
  "user",
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "test@example.com",
  },
  {
    instanceMethods: {
      getFullName: function () {
        return this.get("firstName") + " " + this.get("lastName");
      },
    },
  }
);

export default UserMock;
