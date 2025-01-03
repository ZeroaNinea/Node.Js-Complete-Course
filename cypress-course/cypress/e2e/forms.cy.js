describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms"); // Move to the `forms` path.
  });

  it("Test subscribe forms", () => {
    cy.contains(/Testing Forms/i); // Check with a regular expression if the page contains the "Testing Forms" text.
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input"); // Use the `as` method to refer to the `input` on the next line.
    cy.get("@subscribe-input").type("ryan@coderyan.com"); // Find the `input` tag and asign the `ryan@coderyan.com` value to it.
    cy.contains(/Successfully subbed: ryan@coderyan.com!/i).should("not.exist"); // The hint should not contain the specified text.
    cy.getDataTest("subscribe-button").click(); // Click on the form button.
    cy.contains(/Successfully subbed: ryan@coderyan.com!/i).should("exist"); // The hint should cantain the specified text.
    cy.wait(3000); // Wait for three seconds.
    cy.contains(/Successfully subbed: ryan@coderyan.com!/i).should("not.exist"); // Check if there is the string in the hint again.

    // Check if the hint message is invalid.
    cy.get("@subscribe-input").type("ryan@coderyan.io");
    cy.contains(/Invalid email: ryan@coderyan.io!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Invalid email: ryan@coderyan.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Invalid email: ryan@coderyan.io!/i).should("not.exist");

    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
