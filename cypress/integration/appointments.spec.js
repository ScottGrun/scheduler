describe('Booking Interview', () => {
  beforeEach(() => {
    //Reset the test server
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    //open form
    cy.get('[alt=Add]').first().click();

    //Type into form
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    //Select Interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //Saves interview
    cy.contains('Save').click();

    //check the appropriate appointments are shown
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').first().click({ force: true });

    cy.get('[data-testid=student-name-input]').clear().type('Coll Person Name');

    cy.contains('Save').click();
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').first().click({ force: true });

    cy.contains('button', 'Confirm').click();

    cy.contains('Deleteing');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
