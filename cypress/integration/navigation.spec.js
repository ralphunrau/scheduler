describe("Navigation", () => {

  //COMMANDS TO RUN BEFORE EACH TEST
  beforeEach(() => {
    cy.visit('/');
  })

  it("should visit root", () => {
  });

  it("should navigate to Tuesday", () => {
    cy.get('[data-testid="day"]')
      .contains('[data-testid="day"]', 'Tuesday')
        .click()
        .should('have.class', 'day-list__item--selected')
  });
});