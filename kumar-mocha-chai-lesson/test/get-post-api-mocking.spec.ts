import { expect } from "chai";
import Calculator from "../src/calculator";
import nock from "nock";

const baseUrl = "https://jsonplaceholder.typicode.com";

// Nocks is needed to simulate fake requests and responses from the API.
describe("API Testing", () => {
  it("should make a GET request from API", async () => {
    const calc = new Calculator();
    const mockedUserResponse = { id: 1, name: "kumar programming" };
    nock(baseUrl)
      .get("/users/1") // Sends a request to the API.
      .reply(200, mockedUserResponse); // Responds with a `200` status and the `mockedUserResponse` object.

    const res = await calc.getUser();

    expect(res.status).to.equal(200);
    expect(res.data.id).to.equal(1);
  });

  it("should make a POST request from API", async () => {
    const calc = new Calculator();
    const userPayload = {
      name: "Kumar Programming",
      username: "Kumar",
      email: "Kumar@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };

    const expectedUserResponse = {
      name: "Kumar Programming",
      username: "Kumar",
      email: "Kumar@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
      id: 11,
    };

    nock(baseUrl)
      .post("/users", userPayload) // Intercepts a POST request to `https://jsonplaceholder.typicode.com/users` with the given payload (`userPayload`).
      .reply(201, expectedUserResponse); // Responds with a `201` status and the `expectedUserResponse`.

    const res = await calc.saveUser(userPayload);

    expect(res.status).to.equal(201);
    expect(res.data.id).to.equal(11);
  });

  after(() => {
    nock.cleanAll(); // Ensures that any mocked endpoints are removed after the test suite finishes. Prevents interference between tests.
  });
});
