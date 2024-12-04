import { expect } from "chai";
import Calculator from "../src/calculator";

describe("Test Calculator Class", () => {
  it("should return sum", () => {
    const calc = new Calculator();

    const result = calc.add(2, 3);

    expect(result).to.equal(5);
  });

  it("should return substract", () => {
    const calc = new Calculator();

    const result = calc.subtract(5, 3);

    expect(result).to.equal(2);
  });

  it("should return multiply", () => {
    const calc = new Calculator();

    const result = calc.multiply(5, 3);

    expect(result).to.equal(15);
  });

  it("should return divide", () => {
    const calc = new Calculator();

    const result = calc.divide(9, 3);

    expect(result).to.equal(3);
  });

  it("should throw an error while dividing by zero", () => {
    const calc = new Calculator();

    expect(() => calc.divide(10, 0)).to.throw("Cannot divide by zero.");
  });
});
