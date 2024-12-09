import request from "supertest";
import { expect } from "chai";
import app from "../app";
import User from "../src/models/User";
import sequelize from "../src/connection/database";

describe("Express App", () => {
  before(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
    } catch (err) {
      console.error("Failed to initialize the database:", err);
      throw err;
    }
  });

  // beforeEach(async () => {
  //   await User.destroy({ where: {}, truncate: true });
  // });

  it("should add Jane to the database and return her data", async () => {
    await User.destroy({ where: {}, truncate: true });

    const response = await request(app).get("/");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("firstName", "Jane");
  });

  it("should return Jane's full name", async () => {
    const response = await request(app).get("/get-full-name");
    console.log(response.body);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("fullName", "Jane Doe");
  });
});
