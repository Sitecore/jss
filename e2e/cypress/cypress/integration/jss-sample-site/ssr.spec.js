/* eslint-disable */
/// <reference types="Cypress" />

if(Cypress.env("SSR")) {
  describe('SSR', () => {
    it('Performs SSR on home page', () => {
      cy.request({ url: '/' })
        .then(response => {
          expect(response.body).to.contain('Welcome to Sitecore JSS</title>');
      });
    });

    it('Performs SSR on da-DK dictionary entry', () => {
      cy.request({ url: '/da-DK' })
        .then(response => {
          // navigation item
          expect(response.body).to.contain('Dokumentation');
      });
    });

    if(!Cypress.env("GRAPHQL_SSR")) return;

    it('Performs SSR on GraphQL integrated and connected query', () => {
      cy.request({ url: '/graphql' })
        .then(response => {
          const prefix = Cypress.env('FRAMEWORK') === 'react' ? 'sample1: <!-- -->' : 'sample1: ';
          expect(response.body).to.contain(prefix + 'Hello integrated GraphQL world!');
          expect(response.body).to.contain(prefix + 'Hello connected GraphQL world!');
      });
    });
  })
}
