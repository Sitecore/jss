/* eslint-disable */
/// <reference types="Cypress" />

const PAGE = '/styleguide';

// NOTE: these tests all share one visit - do not mutate the state of the page
// between tests, READ ONLY.

describe('Styleguide-FieldUsage-Text', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-text"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Single-Line Text');
  });

  it('Should Contain Sample Text Value', () => {
    cy.contains(selector, 'This is a sample text field');
  });

  it('Should Contain Sample HTML Text Value', () => {
    cy.contains(selector, 'This is another sample text field using rendering options');
  });

  it('Should Contain Sample Raw Text Value', () => {
    cy.contains(selector, 'Raw value (not editable): This is a sample text field.');
  });
});

describe('Styleguide-FieldUsage-MultiLineText', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-text"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Multi-Line Text');
  });

  it('Should Contain Sample Text Value', () => {
    cy.contains(selector, 'This is a sample multi-line text field');
  });

  it('Should Contain Sample HTML Text Value', () => {
    cy.contains(selector, 'This is another sample multi-line text field using rendering options');
  });

  it('Should Contain Sample Raw Text Value', () => {
    cy.contains(selector, 'Raw value (not editable): This is a sample multi-line text field');
  });
});

describe('Styleguide-FieldUsage-RichText', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-richtext"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Rich Text');
  });

  it('Should Contain Sample Text Value', () => {
    cy.contains(selector, 'This is a sample rich text field.');
  });

  it('Should Contain Sample HTML Marquee', () => {
    // yes, I will fail your tests if you remove my maruqee :)
    cy.get(selector + ' marquee');
  });
});

describe('Styleguide-FieldUsage-Image', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-image"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Image');
  });

  it('Should Contain Correct Sample Image', () => {
    const firstImage = () => cy
      .get(selector)
      .find('img')
      .first();

    firstImage().should('have.attr', 'src').should('include', 'sc_logo');
    firstImage().should('have.attr', 'alt').should('eq', 'Sitecore Logo');
  });

  it('Should Contain Correct Advanced Sample Image', () => {
    const advancedImage = () => cy
      .get(selector)
      .find('img')
      .eq(1);

    advancedImage().should('have.attr', 'src').should('include', 'jss_logo');
    advancedImage().should('have.attr', 'alt').should('eq', 'Sitecore JSS Logo');
    advancedImage().should('have.attr', 'data-sample').should('eq', 'other-attributes-pass-through');
  });

  it('Should Contain Correct Srcset Sample Image', () => {
    const srcsetImage = () => cy
      .get(selector)
      .find('img')
      .eq(2);

    srcsetImage().should('have.attr', 'srcset').should('include', 'jss_logo');
    srcsetImage().should('have.attr', 'srcset').should('include', 'mw=300');
    srcsetImage().should('have.attr', 'alt').should('eq', 'Sitecore JSS Logo');
    srcsetImage().should('have.attr', 'sizes').should('eq', '(min-width: 960px) 300px, 100px');
  });
});

describe('Styleguide-FieldUsage-File', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-file"]';

  it('Should Exist', () => {
    cy.contains(selector, 'File');
  });

  it('Should Contain Correct Sample File Link', () => {
    const fileLink = () => cy
      .get(selector)
      .find('a')
      .first();

    fileLink().should('have.attr', 'href').should('include', 'jss');
    fileLink().contains('Example File');
  });

  it('Should Contain Correct Sample File Link with Custom Body', () => {
    const fileLink = () => cy
      .get(selector)
      .find('a')
      .last();

    fileLink().should('have.attr', 'href').should('include', 'jss');
    fileLink().should('have.attr', 'target').should('include', '_blank');
    fileLink().contains('Custom link body');
  });
});

describe('Styleguide-FieldUsage-Number', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-number"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Number');
  });

  it('Should Contain Sample Number Value', () => {
    cy.contains(selector, '1.21');
  });
});

describe('Styleguide-FieldUsage-Checkbox', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-checkbox"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Checkbox');
  });

  it('Should Contain Sample Boolean True Value', () => {
    cy.get(selector).find('li').first().contains('true');
  });

  it('Should Contain Sample Boolean False Value', () => {
    cy.get(selector).find('li').last().contains('false');
  });
});

describe('Styleguide-FieldUsage-Date', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-date"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Date');
  });

  it('Should Contain Sample Date Value', () => {
    cy.get(selector).find('li').first().contains('2012-05-04T00:00:00Z');
  });

  it('Should Contain Sample Datetime Value', () => {
    cy.get(selector).find('li').eq(1).contains('2018-03-14T15:00:00Z');
  });
});

describe('Styleguide-FieldUsage-Link', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-link"]';

  it('Should Exist', () => {
    cy.contains(selector, 'General Link');
  });

  it('Should Contain Sample External Link Value', () => {
    const link = () => cy.get(selector).find('a').first();

    link().contains('Link to Sitecore');
    link().should('have.attr', 'href').should('eq', 'https://www.sitecore.com');
  });

  it('Should Contain Sample Internal Link Value', () => {
    const link = () => cy.get(selector).find('a').eq(1);

    link().contains('or other components can be used within link renderers');
    link().should('have.attr', 'href').should('contain', '/');
  });

  it('Should Contain Sample Email Link Value', () => {
    const link = () => cy.get(selector).find('a').eq(2);

    link().contains('Send an Email');
    link().should('have.attr', 'href').should('eq', 'mailto:foo@bar.com');
  });

  it('Should Contain Sample Link Params Value', () => {
    const link = () => cy.get(selector).find('a').eq(3);

    link().contains('Sitecore Dev Site');
    link().should('have.attr', 'href').should('eq', 'https://dev.sitecore.net');
    link().should('have.attr', 'title').should('eq', '<a> title attribute');
    link().should('have.attr', 'target').should('eq', '_blank');
    link().should('have.attr', 'class').should('eq', 'font-weight-bold');
  });

  it('Should Contain Sample Link Passthrough Value', () => {
    const link = () => cy.get(selector).find('a').eq(4);

    link().contains('Link to Sitecore');
    link().should('have.attr', 'data-otherattributes').should('eq', 'pass-through-to-anchor-tag');
  });
});

describe('Styleguide-FieldUsage-ItemLink', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-itemlink"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Item Link');
  });

  it('Should Contain Sample Shared Field Value', () => {
    cy.contains(selector, 'ItemLink Demo (Shared) Item 1 Text Field');
  });

  it('Should Contain Sample Local Field Value', () => {
    cy.contains(selector, 'Referenced item textField');
  });
});

describe('Styleguide-FieldUsage-ContentList', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-content-list"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Content List');
  });

  it('Should Contain Sample Shared Field Value', () => {
    cy.contains(selector, 'ContentList Demo (Shared) Item 1 Text Field');
    cy.contains(selector, 'ContentList Demo (Shared) Item 2 Text Field');
  });

  it('Should Contain Sample Local Field Value', () => {
    cy.contains(selector, 'Hello World Item 1');
    cy.contains(selector, 'Hello World Item 2');
  });
});

describe('Styleguide-FieldUsage-CustomFields', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-fieldusage-custom"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Custom Fields');
  });

  it('Should Contain Sample Field Value', () => {
    cy.contains(selector, '31337');
  });
});

describe('Styleguide-Layout-Reuse', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-layout-reuse"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Reusing Content');
  });

  it('Should Contain 4 Columns', () => {
    cy.get(selector).find('.row > .col-sm').should('have.lengthOf', 4);
  });

  it('Should Contain Expected Content', () => {
    const select = (index) => cy.get(selector)
      .find('.row > .col-sm')
      .eq(index);

      select(0).contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      select(1).contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      select(2).contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      select(3).contains('Mix and match reused and local content.');
  });
});

describe('Styleguide-Layout-Tabs', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-layout-tabs"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Tabs');
  });

  it('Should Contain 3 Tabs', () => {
    cy.get(selector).find('.nav-item')
      .should('have.lengthOf', 3)
      .eq(0)
      .contains('Tab 1');
  });

  it('Should Contain Single Tab Content', () => {
    cy.get(selector)
      .find('[data-e2e-class="styleguide-layout-tabs-tab"]')
      .and('have.lengthOf', 1)
      .contains('Tab 1 contents!');
  });
});

describe('Styleguide-SitecoreContext', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-sitecore-context"]';

  // each SG implements context a bit differently
  // so we can't assert the contents of the context
  it('Should Exist', () => {
    cy.contains(selector, 'Sitecore Context');
  });
});

describe('Styleguide-RouteLevelFields', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-route-fields"]';

  // each SG implements context a bit differently
  it('Should Exist', () => {
    cy.contains(selector, 'Route-level Fields');
  });

  it('Should Contain Page Title Field', () => {
    cy.contains(selector, 'Styleguide | Sitecore JSS');
  });

  it('Should Contain Route Link Field', () => {
    cy.contains(selector, 'Sample of using a custom route type');
  });
});

describe('Styleguide-ComponentParams', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-componentparams"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Component Params');
  });

  it('Should Contain CSS Class Param Value', () => {
    cy.get(selector + ' .alert.alert-success');
  });

  it('Should Contain UseCTA Param Value', () => {
    cy.get(selector + ' .alert.alert-info');
  });
});

describe('Styleguide-Tracking', () => {
  before(() => {
    cy.visit(PAGE);
  });

  const selector = '[data-e2e-id="styleguide-tracking"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Tracking');
  });

  // TODO: would be nice to assert something here
});

describe('Styleguide-Multilingual', () => {
  before(() => {
    cy.visit(PAGE);
  });

  // see i18n.spec.js for danish language tests of this

  const selector = '[data-e2e-id="styleguide-multilingual"]';

  it('Should Exist', () => {
    cy.contains(selector, 'Translation Patterns');
  });

  it('Should Contain Dictionary Entry Value', () => {
    cy.contains(selector, 'This is a dictionary entry in English as a demonstration');
  });

  it('Should Contain Current Language', () => {
    cy.contains(selector, 'The current language is: en');
  });
});
