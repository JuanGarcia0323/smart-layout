const moveAround = () => {
  cy.get(".button-swap-layout").first().click();
  // Re-arrange them
  cy.get(".bottom-border-selector-layout").last().click();
  // Check if they were correctly re-arranged
};

describe("template spec", () => {
  it("Check unmount", () => {
    // Enter the page
    cy.visit("/");
    // Count elements
    cy.get("#starting-layout")
      .children()
      .filter(".layout-element")
      .then((elements) => {
        const length = elements.length;
        cy.contains("Show Hide").click();
        cy.get("#starting-layout")
          .children()
          .filter(".layout-element")
          .should("have.length", length - 1);
      });
  });
  it("Reorganize elements", () => {
    cy.visit("/");
    // Activate move and re-arrange
    moveAround();
    // Check if they were correctly re-arranged
    cy.get("#starting-layout")
      .children()
      .filter(".layout-element")
      .last()
      .children()
      .as("lastElementChildren")
      .should("have.length", 2);
    // Check if they can be separated
    cy.get(".layout-element").then((elements) => {
      const length = elements.length;
      cy.get("@lastElementChildren")
        .first()
        .children()
        .first()
        .children()
        .find(".button-moveToTheTop-layout")
        .click();
      cy.get(".layout-element").should("have.length", length - 1);
    });
  });
  it("Check if the layout is correctly saved", () => {
    cy.clearLocalStorage();
    cy.visit("/");
    // Re-arrange
    moveAround();
    // Check what is saved in the local storage
    cy.window().then((win) => {
      const layout = win.localStorage.getItem("starting-layout");
      expect(layout).to.not.be.null;
    });
  });
  it("Check full-screen", () => {
    cy.visit("/");
    cy.get(".button-fullscreen-layout").first().click();
    cy.get(".layout-element").should("have.length", 1);
  });
  it("Check if layout preserving state", () => {
    cy.visit("/");
    cy.get("#button-test-counter").click();
    cy.get("#button-test-counter").then((e) => {
      const text = e.text();
      moveAround();
      cy.get("#button-test-counter").should("have.text", text);
    });
  });
});
