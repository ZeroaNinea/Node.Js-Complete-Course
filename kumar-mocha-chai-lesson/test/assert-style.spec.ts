import { expect, should, assert } from "chai";

describe("assert style", () => {
  it("EXPECT assertion style", () => {
    const name: string = "kumar";
    const age: number = 30;
    const objData: Object = { name, age };
    const arrData: Array<number> = [1, 2, 3];
    const boolData: boolean = true;

    // name
    expect(name).to.be.ok; // If initialized.
    expect(name).to.be.equal("kumar"); // If equal to.
    expect(name).to.not.be.equal("kumar1"); // If not equal to.
    expect(name).to.be.a("string"); // If datatype is.

    // age
    expect(age).to.be.ok;
    expect(age).to.be.equal(30);
    expect(age).to.not.be.equal(0);
    expect(age).to.be.a("number");

    // objData
    expect(objData).to.be.ok;
    expect(objData).to.have.property("name").equal("kumar"); // If have a property.
    expect(objData).to.have.property("age").equal(30);
    expect(objData).to.not.have.property("catgirl").equal(true); // If don't have a property.
    expect(objData).to.be.a("object");

    // array
    expect(arrData).to.be.ok;
    expect(arrData).to.have.lengthOf(3);
    expect(arrData).to.have.lengthOf(3).that.include(2); // If has length `3` and has a value `2`.
    expect(arrData).to.not.have.lengthOf(4).that.does.not.include(5); // If hasn't length `4` and hasn't value `5`;
    expect(arrData).to.be.a("array");

    // boolData
    expect(boolData).to.be.ok;
    expect(boolData).to.be.a("boolean");
    expect(boolData).to.be.true; // If it is true.
  });

  it("ASSERT assertion style", () => {
    should();

    const name: string = "kumar";
    const age: number = 30;
    const objData: Object = { name, age };
    const arrData: Array<number> = [1, 2, 3];
    const boolData: boolean = true;

    // name
    assert.isOk(name); // If initialized.
    assert.equal(name, "kumar"); // If equal to.
    assert.notEqual(name, "kumar1"); // If not equal to.
    assert.typeOf(name, "string"); // If datatype is.

    // age
    assert.isOk(age);
    assert.equal(age, 30);
    assert.notEqual(age, 0);
    assert.typeOf(age, "number");

    // objData
    assert.isOk(objData);
    assert.deepEqual(objData, { name: "kumar", age: 30 }); // If have a property.
    assert.notDeepEqual(objData, { name: "kumar", age: 30, catgirl: true }); // If don't have a property.
    assert.typeOf(objData, "object");

    // arrData
    assert.isOk(arrData);
    assert.deepEqual(arrData, [1, 2, 3]); // Is equal.
    assert.include(arrData, 2); // Includes the value `2`.
    assert.notInclude(arrData, 5); // Doesn't include the value `5`.
    assert.typeOf(arrData, "array"); // Is type of.

    // boolData
    assert.isOk(boolData);
    assert.typeOf(boolData, "boolean");
    assert.equal(boolData, true); // If it is true.
  });

  it("SHOULD assertion style", () => {
    should();

    const name: string = "kumar";
    const age: number = 30;
    const objData: Object = { name, age };
    const arrData: Array<number> = [1, 2, 3];
    const boolData: boolean = true;

    // name
    name.should.be.ok; // If initialized.
    name.should.be.equal("kumar"); // If equal to.
    name.should.not.be.equal("kumar1"); // If not equal to.
    name.should.be.a("string"); // If datatype is.

    // age
    age.should.be.ok;
    age.should.be.equal(30);
    age.should.not.be.equal(0);
    age.should.be.a("number");

    // objData
    objData.should.be.ok;
    objData.should.have.property("name").equal("kumar"); // If have a property.
    objData.should.have.property("age").equal(30);
    objData.should.not.have.property("catgirl").equal(true); // If don't have a property.
    objData.should.be.a("object");

    // arrData
    arrData.should.be.ok;
    arrData.should.have.lengthOf(3);
    arrData.should.have.lengthOf(3).that.include(2); // If has length `3` and has a value `2`.
    arrData.should.not.have.lengthOf(4).that.does.not.include(5); // If hasn't length `4` and hasn't value `5`;
    arrData.should.be.a("array");

    // boolData
    boolData.should.be.ok;
    boolData.should.be.a("boolean");
    boolData.should.be.true; // If it is true.
  });
});
