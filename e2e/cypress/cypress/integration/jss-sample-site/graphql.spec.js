/* eslint-disable */
/// <reference types="Cypress" />

const PAGE = '/graphql';

// NOTE: these tests all share one visit - do not mutate the state of the page
// between tests, READ ONLY.

if(Cypress.env('GRAPHQL')) {
  describe('GraphQL Page', () => {
    before(() => {
      cy.visit(PAGE);
    });

    it('Loads Successfully', () => {
      cy.contains('Using GraphQL with JSS');
    });

    it('Should Set Title Tag', () => {
      cy.get('title').contains('GraphQL');
    });
  })

  describe('GraphQL Integrated', () => {
    const selector = '[data-e2e-id="graphql-integrated"]';

    before(() => {
      cy.visit(PAGE);
    });

    it('Should Render Integrated Sample', () => {
      cy.contains(selector, 'GraphQL Integrated Demo');
    });

    it('Should Render Integrated Sample Datasource Content', () => {
      cy.contains(selector, 'Datasource Item (via Integrated GraphQL)');
      cy.contains(selector, 'sample1: Hello integrated GraphQL world!');
      cy.contains(selector, 'url: https://www.sitecore.com');
    });

    it('Should Render Integrated Sample Route Content', () => {
      cy.contains(selector, 'page title: GraphQL | Sitecore JSS');
      cy.contains(selector, 'Sample 1 Page Title');
    });
  })

  describe('GraphQL Connected', () => {
    const selector = '[data-e2e-id="graphql-connected"]';

    before(() => {
      cy.visit(PAGE);
    });

    it('Should Render Connected Sample', () => {
      cy.contains(selector, 'GraphQL Connected Demo');
    });

    it('Should Render Connected Sample Datasource Content', () => {
      cy.contains(selector, 'Datasource Item (via Connected GraphQL)');
      cy.contains(selector, 'sample1: Hello connected GraphQL world!');
      cy.contains(selector, 'url: https://www.sitecore.com');
    });

    it('Should Render Connected Sample Route Content', () => {
      cy.contains(selector, 'page title: GraphQL | Sitecore JSS');
      cy.contains(selector, 'Sample 1 Page Title');
    });
  });
}
