describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("hero section", () => {
    // The `context` function creates a drop-down menu for a group of cases.
    it("the h1 contains the correct text", () => {
      cy.get("h1")
        .should("exist")
        .contains("Testing Next.js Applications with Cypress");
    });

    it("the features on the homepage are correct", () => {
      cy.get("dt").eq(0).contains("4 Courses");
    });
  });

  context("Courses section", () => {
    it.only("Course: Testing Your First Next.js Application", () => {
      cy.getByData("course-0").find("a").eq(3).click();
      cy.location("pathname").should("eq", "/testing-your-first-application");
    });
  });
});
