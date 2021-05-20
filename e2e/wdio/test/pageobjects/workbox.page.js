const Page = require('./page');

class WorkboxPage extends Page {
  open() {
    return super.open('/sitecore/shell/Applications/Workbox.aspx?sc_bw=1');
  }

  async publishContentItems() {
    this.open();
    await browser.switchToParentFrame();
    await browser.switchToFrame(
      await $('[src="/sitecore/shell/default.aspx?xmlcontrol=Workbox&mo=preview"]')
    );
    const jssDevelopmentWorkflowCheckbox = await (await $('label=JSS Development Workflow')).$(
      '..//input'
    );
    if (!(await jssDevelopmentWorkflowCheckbox.getAttribute('checked'))) {
      await browser.click({ element: await $('label=JSS Development Workflow') });
    }
    const developmentModeCollapsed = await $$('[class="scSectionCenter"]');
    const contentModeCollapsed = await $$('[class="scSectionCenter"]');

    const numOfDevItems = await (await developmentModeCollapsed[0]).getText();
    console.log(numOfDevItems);
    if (numOfDevItems.match(/\(([^)]+)\ /)) {
      console.log(numOfDevItems);
      if (parseInt(numOfDevItems.match(/\(([^)]+)\ /)[1]) > 0) {
        if (
          (await (await (await developmentModeCollapsed[0]).$('..')).getAttribute('class')) ===
          'scCollapsed'
        ) {
          await (await developmentModeCollapsed[0]).click();
        }
        await browser.click({ element: 'span=To Content Mode (all)', scroll: true });
      }
    }
    const numOfContentItems = await (await contentModeCollapsed[1]).getText();
    console.log(numOfContentItems);

    if (numOfContentItems.match(/\(([^)]+)\ /)) {
      if (parseInt(numOfContentItems.match(/\(([^)]+)\ /)[1]) > 0) {
        if (
          (await (await (await developmentModeCollapsed[1]).$('..')).getAttribute('class')) ===
          'scCollapsed'
        ) {
          await (await contentModeCollapsed[1]).click();
        }

        await browser.click({ element: 'span*=Publish (all)', scroll: true });
        await browser.switchToParentFrame();
        await this.switchToNestedIframe();
        await browser.click({ element: this.getElementById('Close') });
        await browser.switchToParentFrame();
        await browser.switchToParentFrame();
        await browser.switchToFrame(
          await $('[src="/sitecore/shell/default.aspx?xmlcontrol=Workbox&mo=preview"]')
        );
        if (await (await $('span=Styleguide-FieldUsage-RichText-3')).isDisplayed()) {
          console.log('STYLEGUIDE !!!!');
          await (await $('span=Styleguide-FieldUsage-RichText-3')).click();
          await browser.switchToParentFrame();
          await this.switchToNestedIframe();
          const styleguideRichTextRedBar = await $('[class*="scEditorFieldMarkerBarCellRed"]');
          await styleguideRichTextRedBar.scrollIntoView();
          if (await styleguideRichTextRedBar.isDisplayed()) {
            const suggestFixLink = await $$('*=Suggest fix');
            await (await suggestFixLink[2]).scrollIntoView();
            await (await suggestFixLink[2]).click();
            await browser.switchToParentFrame();
            await browser.switchToParentFrame();
            await browser.switchToFrame(await $('#jqueryModalDialogsFrame'));
            await browser.switchToFrame(await $('#scContentIframeId1'));
            await browser.click({ element: this.getElementById('OK') });
            await browser.switchToParentFrame();
            await browser.switchToParentFrame();
            this.switchToNestedIframe();
            await browser.click({ element: this.getElementByText('Save') });
            await browser.click({ element: this.getElementByText('Close') });
            await browser.switchToParentFrame();
            await browser.switchToParentFrame();

            await browser.switchToFrame(
              await $('[src="/sitecore/shell/default.aspx?xmlcontrol=Workbox&mo=preview"]')
            );
            await browser.click('span*=Publish (all)');
          }
        }
      }
    }
  }
}

module.exports = new WorkboxPage();
