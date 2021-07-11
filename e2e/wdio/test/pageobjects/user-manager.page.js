const Page = require('./page');

class UserManagerPage extends Page {
  open() {
    return super.open('/sitecore/shell/Applications/Security/User%20Manager.aspx?sc_bw=1');
  }

  getUserXpath(username) {
    return `//*[@id="Users_dom"]//tr//*[contains(., "${username}")]`;
  }

  async enableAdministratorPermissionForUser(username) {
    this.open();
    await browser.pause(1000);
    await browser.clickByJS(this.getUserXpath(username));
    await browser.click({ element: this.getElementByText('Edit') });
    await browser.switchToFrame(await $('#jqueryModalDialogsFrame'));
    await browser.switchToFrame(await $('#scContentIframeId0'));
    const adminCheckbox = await $('#IsAdministrator');
    if (!(await adminCheckbox.getAttribute('checked'))) {
      await browser.clickByJS(this.getXpathByID('IsAdministrator'));
      await browser.click({ element: this.getElementById('OK') });
    }
  }
}
module.exports = new UserManagerPage();
