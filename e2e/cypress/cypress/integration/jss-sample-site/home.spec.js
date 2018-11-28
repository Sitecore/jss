/* eslint-disable */
/// <reference types="Cypress" />

// NOTE: these tests all share one visit - do not mutate the state of the page
// between tests, READ ONLY.

describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('Loads Successfully', () => {
    cy.contains('Welcome to Sitecore JSS');
  });

  it('Should Set Title Tag', () => {
    cy.get('title').contains('Welcome to Sitecore JSS');
  });
})
