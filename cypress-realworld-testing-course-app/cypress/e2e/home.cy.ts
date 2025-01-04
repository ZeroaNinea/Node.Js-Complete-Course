describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("the h1 contains the correct text", () => {
    cy.get("[data-test='hero-heading']")
      .should("exist")
      .contains("Testing Next.js Applications with Cypress");
  });

  it.only("the features on the homepage are correct", () => {
    cy.get("dt").eq(0).contains("4 Courses");
  });
});
