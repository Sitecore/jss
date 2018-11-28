/* eslint-disable */
/// <reference types="Cypress" />

describe('Page Not Found', () => {
  if(Cypress.env('SSR')) {
    it('Returns 404 status code', () => {
      cy.request({ url: '/nonexistant', failOnStatusCode: false })
        .then(response => {
          expect(response.status).to.eq(404);
      });
    });
  }

  it('Contains Not Found', () => {
    cy.visit('/nonexistant', { failOnStatusCode: false });
    cy.contains(/not found/i);
  });
});

describe('Navigation', () => {
  it('Should Navigate To Styleguide', () => {
    cy.visit('/');
    cy.wait(100);
    cy.get('a[href="/styleguide"]').first().click();
    cy.url().should('include', '/styleguide');
  });

  it('Should Navigate To GraphQL', () => {
    cy.visit('/');
    cy.wait(100);
    cy.get('a[href="/graphql"]').first().click();
    cy.url().should('include', '/graphql');
  })
});
