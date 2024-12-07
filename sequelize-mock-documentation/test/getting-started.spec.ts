import { expect } from "chai";
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

describe("Sequelize Mock - User Model", () => {
  it("should return full name using getFullName", async () => {
    const user = await UserMock.create();
    expect(user.getFullName()).to.equal("Jane Doe");
  });

  it("should return the correct email", async () => {
    const user = await UserMock.create();
    expect(user.get("email")).to.equal("test@example.com");
  });
});
