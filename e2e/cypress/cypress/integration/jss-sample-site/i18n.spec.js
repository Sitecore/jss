/* eslint-disable */
/// <reference types="Cypress" />

const PAGE = '/styleguide';

describe('Language URL Routing', () => {
  it('Should Handle Bare URL', () => {
    cy.visit(PAGE);
    cy.contains('This is a live set of examples');
  });

  it('Should Handle English in URL', () => {
    cy.visit(`/en${PAGE}`);
    cy.contains('This is a live set of examples');
  });

  it('Should Handle Danish in URL', () => {
    cy.visit(`/da-dk${PAGE}`);
    cy.contains('Indholdet og layoutet');
  });
});

describe('Danish Styleguide', () => {
  before(() => {
    cy.visit(`/da-dk${PAGE}`);
  });

  const selector = '[data-e2e-id="styleguide-multilingual"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Brug af ordbogen');
  });

  it('Should Contain Dictionary Entry Value', () => {
    cy.contains(selector, 'Dette er en ordbogspost på dansk som en demonstration');
  });

  it('Should Contain Current Language', () => {
    cy.contains(selector, /The current language is: da-dk/i);
  });

  it('Should Contain Danish Navigation Value', () => {
    cy.contains('Dokumentation');
  });
});

describe('Language Switch Link', () => {
  before(() => {
    cy.visit(`/da-dk${PAGE}`);
  });

  const selector = '[data-e2e-id="styleguide-multilingual"]';

  it('Should Switch Language When Clicked', () => {
    cy.get(selector + ' a[href="/en/styleguide"').click();
    // en intro text
    cy.contains('The content and layout of this page');
    // global nav
    cy.contains('Documentation');
  });
});
