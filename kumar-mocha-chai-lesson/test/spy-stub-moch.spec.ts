import { expect } from "chai";
import Calculator from "../src/calculator";
import sinon, { SinonMock, SinonSpy, SinonStub } from "sinon";

describe("Spy Stub and Mock Tests", () => {
  let calc: Calculator;
  let spy: SinonSpy;
  let stub: SinonStub;
  let mock: SinonMock;

  before(() => {
    console.log("before");

    calc = new Calculator();
  });

  beforeEach(() => {
    console.log("before each");
    mock = sinon.mock(calc); // Replaces class instances and allow to temporarily assign mock behavior to it.
  });

  describe("add test suite", () => {
    it("should return sum", () => {
      // Spies are checking if methods are called.
      spy = sinon.spy(calc, "add"); // Sinon tracks the `calc.add` method.
      stub = sinon.stub(calc, "getRandomValue").returns(2); // `Stabs` replace functions with controllable behaviors. The `getRandomValue` function will always return `2`.

      let expectation = mock
        .expects("logMessage") // Expect the `logMessage` method to be called.
        .exactly(1) // It should be called exactly once.
        .withArgs("logging add function"); // It should be called with this specific argument.
      const result = calc.add(2, 3); // The `add` method is called and the spy tracks this call.

      expect(result).to.equal(5);
      expect(spy.calledOnceWith(2, 3)).to.be.true; // Spy checks if `add` method is called.
      expectation.verify(); // After the test logic runs, the mock checks if the expectations were met. If they were not, `.verify` throws an error, causing the test to fail.
    });
  });

  describe("substract test suite", () => {
    it("should return subtract", () => {
      spy = sinon.spy(calc, "subtract");
      let expectation = mock
        .expects("logMessage")
        .exactly(1)
        .withArgs("logging subtract function");

      const result = calc.subtract(5, 3);

      expect(result).to.equal(2);
      expect(spy.calledOnceWith(5, 3)).to.be.true;
      expectation.verify();
    });
  });

  afterEach(() => {
    console.log("after each");
    if (spy) spy.restore(); // Restores the original method after the check.
    if (stub) stub.restore(); // Restores the original method.
    if (mock) mock.restore(); // Restores the original instance of the class.
  });

  after(() => {
    console.log("after");
  });
});
