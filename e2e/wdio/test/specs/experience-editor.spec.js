const Base = require('../../base')
let ogHandle
require('dotenv').config();


jasmine.DEFAULT_TIMEOUT_INTERVAL=40000000

describe('Experience Editor Tests', function () {

  beforeAll(async function() {
    await Base.LoginPage.login()
    ogHandle = browser.getWindowHandle()
  })

  afterEach(async function () {
    try {
      await browser.closeWindow()
      const windowHandles = await browser.getWindowHandles()
      await browser.switchToWindow(windowHandles[0])
    } catch (e) {}
  })

  function visitLocalHost() {
    browser.url('http://localhost:3000')
  }

  it('Should display sample content', async function () {
    let header;
    let body;
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    if (await browser.displayed({element: Base.ExperienceEditorPage.getSingleLineTextLocator()})) {
      // await Base.ExperienceEditorPage.welcomeToSCField()
      header = await Base.ExperienceEditorPage.getWelcometoSCFieldText()
      body = await Base.ExperienceEditorPage.getBodyText()
    }
    const headerExpected = 'Welcome to Sitecore JSS'
    const bodyExpected = 'Thanks for using JSS!! Here are some resources to get you started:\n' +
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
      'Delete /data/dictionary/*.yml'

    assert(headerExpected === header)
    assert(bodyExpected === body)


    await browser.pause(5000)
  })

  it('Should be able to inline edit', async function () {
    const newEdit = `Hello Welcome to JSS ${Base.Base.randomStr()}`
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    await Base.ExperienceEditorPage.welcomeToSCField()
    await browser.clearField()
    await browser.typeWithKeys(newEdit)
    await Base.ExperienceEditorPage.switchToFrameToolBar()
    await Base.ExperienceEditorPage.saveChanges()
    assert(newEdit === await Base.ExperienceEditorPage.getWelcometoSCFieldText(),
      `EE field that was saved should equal ${newEdit}`)
    visitLocalHost()
    browser.displayed({element: `h2=${newEdit}`})
    let actualTxtFromStartedApp = await $(`h2=${newEdit}`)
    assert(newEdit === await actualTxtFromStartedApp.getText(),
      `EE field that was saved should equal ${newEdit} when starting app in localhost:3000`)
  })

  it('Should be able to edit via rich text editor', async function () {
    const newEdit = `Hello Welcome to JSS ${Base.Base.randomStr()}`
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    await Base.ExperienceEditorPage.richTextEditor(newEdit)
    assert(newEdit === await (await $('[scfieldtype="rich text"]')).getText(),
      `EE field that was saved should equal ${newEdit}`)
    visitLocalHost()
    await browser.displayed({element: `div=${newEdit}`})
    let actualTxtFromStartedApp = await $(`div=${newEdit}`)
    assert(newEdit === await actualTxtFromStartedApp.getText(),
      `RichTextEditor field that was saved should equal ${newEdit} when starting app in localhost:3000`)
  })

  it('Should be able to remove component', async function () {
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    await Base.ExperienceEditorPage.welcomeToSCField()
    await Base.ExperienceEditorPage.goToParentComponent()
    await Base.ExperienceEditorPage.removeComponent()
    await Base.ExperienceEditorPage.switchToFrameToolBar()
    await Base.ExperienceEditorPage.saveChanges()
    assert('' === await Base.ExperienceEditorPage.getEmptyPlaceholderTxt(),
      `EE field that was saved should equal empty`)
    visitLocalHost()
    await browser.notDisplayed({element: 'h2', options: {timeout: 3000}})
    await browser.notDisplayed({element: 'p', options: {timeout: 1000}})
  })

  it('Should be able to add component', async function () {
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    try {
      await Base.ExperienceEditorPage.welcomeToSCField({timeout: 3000})
      await Base.ExperienceEditorPage.goToParentComponent()
      await Base.ExperienceEditorPage.removeComponent()
      await Base.ExperienceEditorPage.switchToFrameToolBar()
      await Base.ExperienceEditorPage.saveChanges()
    } catch (e) {}
    assert('' === await Base.ExperienceEditorPage.getEmptyPlaceholderTxt(),
      `EE field that was saved should equal empty`)
    await browser.closeWindow()
    const windowHandles = await browser.getWindowHandles()
    await browser.switchToWindow(windowHandles[0])
    visitLocalHost()
    await browser.notDisplayed({element: 'h2', options: {timeout: 3000}})
    await browser.notDisplayed({element: 'p', options: {timeout: 1000}})
    await Base.ContentEditorPage.openExperienceEditor(process.env.APPNAME)
    await Base.ExperienceEditorPage.addComponent()
    await Base.ExperienceEditorPage.switchToFrameToolBar()
    await Base.ExperienceEditorPage.saveChanges()
    assert(await Base.ExperienceEditorPage.getWelcometoSCFieldText(),
      `EE component added that was saved should equal be non empty`)
    visitLocalHost()
    browser.displayed({element: `h2`})
    assert(await (await $('h2')).getText(),
      `EE component added that was saved should equal be non empty when starting app in localhost:3000`)
    assert(await (await $('div')).getText(),
      `EE component added that was saved should equal be non empty when starting app in localhost:3000`)
  })

})
