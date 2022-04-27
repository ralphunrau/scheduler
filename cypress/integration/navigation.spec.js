// navigation.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Navigation", () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it("should visit root", () => {
  });

  it("should navigate to Tuesday", () => {
    cy.get('li')
      .contains('li', 'Tuesday')
        .click()
        .should('have.css', 'background-color', 'rgb(242, 242, 242)')
  });
});