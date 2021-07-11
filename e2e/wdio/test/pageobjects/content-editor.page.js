const Page = require('./page');

class ContentEditorPage extends Page {
  open() {
    return super.open('/sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1');
  }

  async openExperienceEditor(appName) {
    this.open();
    await browser.click({ element: this.getSCNode(appName) });
    await browser.click({ element: 'span=home' });
    await this.clickOnPublishTab();
    const ogWindowHandle = await browser.getWindowHandle();
    await browser.click({ element: 'span=Experience Editor' });
    await browser.waitUntil(async function() {
      return (await browser.getWindowHandles().length) > 1;
    });

    const windowHandles = await browser.getWindowHandles();
    const popupWindow = windowHandles.filter((handle) => handle !== ogWindowHandle)[0];
    await browser.switchToWindow(popupWindow);
    browser.pause(3000);
    return ogWindowHandle;
  }

  async clickOnApp(appName) {
    await browser.click({ element: `span=${appName}` });
  }

  async clickOnPublishTab() {
    await browser.click({ element: 'a=Publish' });
  }

  getSCNode(itemName) {
    return `//span[contains(.,"${itemName}")]/../../*[@class="scContentTreeNodeGlyph"]`;
  }

  async createApiKey() {
    this.open();
    await browser.click({ element: this.getSCNode('System') });
    await browser.click({ element: this.getSCNode('Settings') });
    await browser.click({ element: this.getSCNode('Services') });
    await browser.click({ element: this.getElementByText('API Keys') });
    await browser.click({ element: this.getElementByText('API Key') });
    await this.switchToNestedIframe();
    await browser.click({ element: this.getElementById('OK') });
    const apikey = await $('[class="scEditorHeaderQuickInfoInput"]');
    return apikey.getAttribute('value');
  }

  async getApiKey(apiKeyName) {
    this.open();
    await browser.click({ element: this.getSCNode('System') });
    await browser.click({ element: this.getSCNode('Settings') });
    await browser.click({ element: this.getSCNode('Services') });
    await browser.click({ element: this.getSCNode('API Keys') });
    await browser.click({ element: `span=${apiKeyName}`, scroll: true });
    const apikey = await $('[class="scEditorHeaderQuickInfoInput"]');
    return apikey.getAttribute('value');
  }

  async publishSite(appName) {
    this.open();
    await this.clickOnApp(appName);
    await this.clickOnPublishTab();
    await browser.click({ element: 'span=Publish' });
    await browser.click({ element: 'td=Publish site', index: 1 });
    await this.switchToNestedIframe();
    await browser.displayed({ element: this.getElementById('SelectAllLanguages') });
    console.log('SELECT ALL LANGUAGES IS CURRENTLY CHECKED - ');
    console.log(await (await $(this.getElementById('SelectAllLanguages'))).getAttribute('checked'));
    if (!(await (await $(this.getElementById('SelectAllLanguages'))).getAttribute('checked'))) {
      await browser.click({ element: this.getElementById('SelectAllLanguages') });
    }
    if (!(await (await $(this.getElementById('SmartPublish'))).getAttribute('checked'))) {
      await browser.click({ element: this.getElementById('SmartPublish') });
    }
    await browser.click({ element: this.getElementById('NextButton') });
    await browser.waitUntil(
      async function() {
        const publishSiteSuccessMsg = await $('span=The website has been published.');
        return await publishSiteSuccessMsg.isDisplayed();
      },
      { timeout: 75000 }
    );
    const publishSiteSuccessMsg = await $('span=The website has been published.');
    const actualPublishSiteSuccessMsg = await publishSiteSuccessMsg.getText();
    assert('The website has been published.' === actualPublishSiteSuccessMsg);
    await browser.click({ element: this.getElementById('CancelButton') });
    await browser.pause(1000);
  }
}
module.exports = new ContentEditorPage();
