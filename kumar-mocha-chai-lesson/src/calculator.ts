import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

class Calculator {
  add(a: number, b: number): number {
    this.logMessage("logging add function");
    const c = this.getRandomValue();
    return a + b + c;
  }

  subtract(a: number, b: number): number {
    this.logMessage("logging subtract function");
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero.");
    }

    return a / b;
  }

  getRandomValue(): number {
    return Math.floor(Math.random() * 10 + 1);
  }

  logMessage(msg: string) {
    console.log(msg);
  }

  asyncFunctionPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(4);
      }, 1000);
    });
  }

  async getUser() {
    return await axios.get(`${baseUrl}/users/1`);
  }

  async saveUser(userPayload: any) {
    return await axios.post(`${baseUrl}/users`, userPayload);
  }
}

export default Calculator;
