import { expect } from "chai";
import Calculator from "../src/calculator";

describe.skip("hooks test", () => {
  let calc: Calculator;
  before(() => {
    // Runs before the first test.
    console.log("before");
    calc = new Calculator();
  });

  beforeEach(() => {
    // Runs before each test.
    console.log("before each");
  });

  describe("add test suite", () => {
    it("should return sum", () => {
      const result = calc.add(2, 3);

      expect(result).to.equal(5);
    });
  });

  describe("substract test suite", () => {
    it("should return substract", () => {
      const result = calc.subtract(5, 3);

      expect(result).to.equal(2);
    });
  });

  afterEach(() => {
    // Runs after each test.
    console.log("after each");
  });

  after(() => {
    // Runs after the last test.
    console.log("after");
  });
});
