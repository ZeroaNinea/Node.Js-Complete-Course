import { expect } from "chai";
import SequelizeMock from "sequelize-mock";

const DBConnectionMock = new SequelizeMock();

const UserMock = DBConnectionMock.define("User", {
  id: 1,
  name: "Test User",
  email: "testuser@example.com",
});

describe("User Model Tests", () => {
  it("should fetch user by id", async () => {
    const user = await UserMock.findOne({ where: { id: 1 } });

    expect(user.get("name")).to.equal("Test User");
    expect(user.get("email")).to.equal("testuser@example.com");
  });
});
