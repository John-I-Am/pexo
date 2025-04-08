describe('e2e', () => {
  it('should allow user to login', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => false);
    // Start from the index page
    cy.visit('/');

    cy.get('h1').contains('Pexo');

    // Find a link with an href attribute containing "about" and click it
    cy.contains('Log In').click();
    cy.get('input:first').type('test@example.com');
    cy.contains('Sign in').click();
    cy.contains('Check your email');

    cy.visit('http://localhost:8025/view/latest.html');
    cy.get('a').invoke('removeAttr', 'target').click();
    cy.contains('test@example.com');
  });
});
