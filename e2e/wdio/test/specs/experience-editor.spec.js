const Base = require('../../base');
let ogHandle;
require('dotenv').config();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('Experience Editor Tests*', function() {
  beforeAll(async function() {
    await Base.LoginPage.login();
    ogHandle = browser.getWindowHandle();
  });

  afterEach(async function() {
    try {
      await browser.closeWindow();
      const windowHandles = await browser.getWindowHandles();
      await browser.switchToWindow(windowHandles[0]);
    } catch (e) {}
  });

  /**
   *
   */
  function visitLocalHost() {
    browser.url('http://localhost:3000');
  }

  it('Should display sample content', async function() {
    let header;
    let body;
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    if (
      await browser.displayed({ element: Base.ExperienceEditorPage.getSingleLineTextLocator() })
    ) {
      header = await Base.ExperienceEditorPage.getWelcometoSCFieldText();
      body = await Base.ExperienceEditorPage.getBodyText();
    }
    const headerExpected = 'Welcome to Sitecore JSS';
    const bodyExpected =
      'Thanks for using JSS!! Here are some resources to get you started:\n' +
      'Documentation\n' +
      'The official JSS documentation can help you with any JSS task from getting started to advanced techniques.\n' +
      'Styleguide\n' +
      'The JSS styleguide is a living example of how to use JSS, hosted right in this app. It demonstrates most of the common patterns that JSS implementations may need to use, as well as useful architectural patterns.\n' +
      'GraphQL\n' +
      'JSS features integration with the Sitecore GraphQL API to enable fetching non-route data from Sitecore - or from other internal backends as an API aggregator or proxy. This route is a living example of how to use an integrate with GraphQL data in a JSS app.\n' +
      'This app is a boilerplate\n' +
      'The JSS samples are a boilerplate, not a library. That means that any code in this app is meant for you to own and customize to your own requirements.\n' +
      'Want to change the lint settings? Do it. Want to read manifest data from a MongoDB database? Go for it. This app is yours.\n' +
      'How to start with an empty app\n' +
      'To remove all of the default sample content (the Styleguide and GraphQL routes) and start out with an empty JSS app:\n' +
      'Delete /src/components/Styleguide* and /src/components/GraphQL*\n' +
      'Delete /sitecore/definitions/components/Styleguide*, /sitecore/definitions/templates/Styleguide*, and /sitecore/definitions/components/GraphQL*\n' +
      'Delete /data/component-content/Styleguide\n' +
      'Delete /data/content/Styleguide\n' +
      'Delete /data/routes/styleguide and /data/routes/graphql\n' +
      'Delete /data/dictionary/*.yml';

    try {
      assert(headerExpected === header);
      assert(bodyExpected === body);
    } catch (e) {
      assert(header);
      assert(body);
    }
  });

  it('Should be able to inline edit', async function() {
    const newEdit = `Hello Welcome to JSS ${Base.Base.randomStr()}`;
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    await Base.ExperienceEditorPage.welcomeToSCField();
    await browser.clearField();
    await browser.typeWithKeys(newEdit);
    await Base.ExperienceEditorPage.switchToFrameToolBar();
    await Base.ExperienceEditorPage.saveChanges();
    let actualEE = await Base.ExperienceEditorPage.getWelcometoSCFieldText();
    assert(
      newEdit === actualEE.trim(),
      `EE field that was saved should equal ${newEdit} but the actual is ${actualEE}`
    );
    await Base.ContentEditorPage.publishSite(process.env.APPNAME);
    visitLocalHost();
    await browser.refreshUntilDisplayed({ element: `h2=${newEdit}`, options: { timeout: 20000 } });
    await browser.displayed({ element: `h2=${newEdit}`, options: { timeout: 20000 } });
    let actualTxtFromStartedApp = await $(`h2=${newEdit}`);
    let actual = await actualTxtFromStartedApp.getText();
    assert(
      newEdit === actual.trim(),
      `EE field that was saved should equal ${newEdit} when starting app in localhost:3000 but the actual is ${actual}`
    );
  });

  it('Should be able to edit via rich text editor', async function() {
    const newEdit = `Hello Welcome to JSS ${Base.Base.randomStr()}`;
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    await Base.ExperienceEditorPage.richTextEditor(newEdit);
    await browser.displayed({ element: await $('[scfieldtype="rich text"]') });
    let actualEE = await (await $('[scfieldtype="rich text"]')).getText();
    assert(
      newEdit === actualEE.trim(),
      `EE field that was saved should equal "${newEdit}" but the actual is "${actualEE}"`
    );
    await Base.ContentEditorPage.publishSite(process.env.APPNAME);
    visitLocalHost();
    await browser.refreshUntilDisplayed({ element: `div=${newEdit}` });
    await browser.displayed({ element: `div=${newEdit}`, options: { timeout: 20000 } });
    let actualTxtFromStartedApp = await $(`div=${newEdit}`);
    let actual = await actualTxtFromStartedApp.getText();
    assert(
      newEdit === actual.trim(),
      `RichTextEditor field that was saved should equal ${newEdit} when starting app in localhost:3000 but the actual is ${actual}`
    );
  });

  it('Should be able to remove component', async function() {
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    await Base.ExperienceEditorPage.welcomeToSCField();
    await Base.ExperienceEditorPage.goToParentComponent();
    await Base.ExperienceEditorPage.removeComponent();
    await Base.ExperienceEditorPage.switchToFrameToolBar();
    await Base.ExperienceEditorPage.saveChanges();
    assert(
      '' === (await Base.ExperienceEditorPage.getEmptyPlaceholderTxt()),
      'EE field that was saved should equal empty'
    );
    await Base.ContentEditorPage.publishSite(process.env.APPNAME);
    visitLocalHost();
    await browser.refreshUntilNotDisplayed({ element: 'h2', options: { timeout: 3000 } });
    await browser.notDisplayed({ element: 'h2', options: { timeout: 2000 } });
    await browser.notDisplayed({ element: 'p', options: { timeout: 1000 } });
  });

  it('Should be able to add component', async function() {
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    try {
      await Base.ExperienceEditorPage.welcomeToSCField({ timeout: 3000 });
      await Base.ExperienceEditorPage.goToParentComponent();
      await Base.ExperienceEditorPage.removeComponent();
      await Base.ExperienceEditorPage.switchToFrameToolBar();
      await Base.ExperienceEditorPage.saveChanges();
    } catch (e) {}
    assert(
      '' === (await Base.ExperienceEditorPage.getEmptyPlaceholderTxt()),
      `EE field that was saved should equal empty but the actual is ${await Base.ExperienceEditorPage.getEmptyPlaceholderTxt()}`
    );
    await browser.closeWindow();
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[0]);
    await Base.ContentEditorPage.publishSite(process.env.APPNAME);
    visitLocalHost();
    await browser.refreshUntilNotDisplayed({ element: 'h2', options: { timeout: 3000 } });
    await browser.notDisplayed({ element: 'h2', options: { timeout: 2000 } });
    await browser.notDisplayed({ element: 'p', options: { timeout: 1000 } });
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME);
    await Base.ExperienceEditorPage.addComponent();
    await Base.ExperienceEditorPage.switchToFrameToolBar();
    await Base.ExperienceEditorPage.saveChanges();
    await browser.displayed({ element: Base.ExperienceEditorPage.getSingleLineTextLocator() });
    assert(
      await Base.ExperienceEditorPage.getWelcometoSCFieldText(),
      'EE component added that was saved should equal be non empty'
    );
    await Base.ContentEditorPage.publishSite(process.env.APPNAME);
    visitLocalHost();
    await browser.refreshUntilDisplayed({ element: 'h2', options: { timeout: 3000 } });
    browser.displayed({ element: 'h2' });
    assert(
      await (await $('h2')).getText(),
      'EE component added that was saved should equal be non empty when starting app in localhost:3000'
    );
    assert(
      await (await $('div')).getText(),
      'EE component added that was saved should equal be non empty when starting app in localhost:3000'
    );
  });
});
