import { expect } from "chai";
import SequelizeMock from "sequelize-mock";
import UserMock from "./mocks/UserMock";

// Initialize mock Sequelize instance.
const dbMock = new SequelizeMock();

// Override real model with mock model.
dbMock.$overrideImport("./src/models/User", "./test/mocks/UserMock");

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
