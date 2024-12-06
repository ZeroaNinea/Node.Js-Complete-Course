import { expect } from "chai";
import Calculator from "../src/calculator";

describe("ASYNC AWAIT AND PROMISE TEST SUITE", () => {
  let calc: Calculator;

  it("should work with async and await", async () => {
    calc = new Calculator();

    const result = await calc.asyncFunctionPromise();

    expect(result).to.equal(4);
  });

  it("should work with async and await", async () => {
    calc = new Calculator();

    calc.asyncFunctionPromise().then((result) => {
      expect(result).to.equal(4);
    });
  });
});
