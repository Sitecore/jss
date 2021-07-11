const Page = require('./page');

class ExperienceEditorPage extends Page {
  async switchToFrameToolBar() {
    await browser.switchToFrame(await $('#scWebEditRibbon'));
  }

  async saveChanges() {
    await browser.click({ element: '[title="Save changes."]' });
    await browser.pause(3000);
  }

  getSingleLineTextLocator() {
    return '[scfieldtype="single-line text"]';
  }

  async welcomeToSCField(options = {}) {
    await browser.click({ element: this.getSingleLineTextLocator(), options: options });
    await browser.pause(500);
  }

  async getWelcometoSCFieldText() {
    return await (await $(this.getSingleLineTextLocator())).getText();
  }

  async getEmptyPlaceholderTxt() {
    return await (await $('[class*="scEmptyPlaceholder"]')).getText();
  }

  async body() {
    await browser.click({ element: 'p*=Thanks for using JSS' });
  }

  async getBodyText() {
    return await (await $('[scfieldtype="rich text"]')).getText();
  }

  async goToParentComponent() {
    await browser.click({
      element: '[title="Go to the parent component. (Content Block)"]',
      index: 1,
    });
  }

  async removeComponent() {
    await browser.click({ element: '[alt="Remove component."]', index: 1 });
  }

  async addComponent() {
    await browser.click({ element: '[sc-placeholder-id="jss_main"]' });
    await browser.pause(1000);
    await browser.click({ element: 'span=Add here' });

    await browser.pause(2000);
    await this.switchToNestedIframe();

    await browser.click({ element: 'span=Content Block' });
    await browser.click({ element: this.getElementById('OK') });
    await this.switchToNestedIframe();

    await browser.click({ element: 'span*=ContentBlock-1' });
    await browser.click({ element: this.getElementById('OK') });
    await browser.pause(1000);
  }

  async switchToFrameRichTextEditor() {
    await browser.switchToFrame(await $('#Editor_contentIframe'));
  }

  async richTextEditor(newEdit) {
    await browser.click({ element: '[scfieldtype="rich text"]' });
    await browser.click({ element: '[title="Edit the text"]', index: 1 });
    await browser.pause(1000);
    await this.switchToNestedIframe();
    await this.switchToFrameRichTextEditor();

    await browser.displayed({ element: 'body' });
    const richTextEditorBody = await $('body');

    try {
      const allParagInBody = await await (await richTextEditorBody).$$('p');
      const firstParagInBody = await allParagInBody[0];
      await firstParagInBody.click();
    } catch (e) {
      console.log(e.toString());
      await richTextEditorBody.click();
    }
    await browser.clearField();
    await browser.typeWithKeys(newEdit);
    await browser.pause(1000);
    await browser.switchToParentFrame();
    await browser.switchToParentFrame();
    await browser.switchToParentFrame();
    await this.switchToNestedIframe();
    await browser.click({ element: this.getElementById('OkButton') });
    await this.switchToFrameToolBar();
    await this.saveChanges();
  }
}
module.exports = new ExperienceEditorPage();
