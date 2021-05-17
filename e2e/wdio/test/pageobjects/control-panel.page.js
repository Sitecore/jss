const Page = require('./page');

class ControlPanelPage extends Page {

  open () {
    return super.open('/sitecore/client/Applications/ControlPanel.aspx?sc_bw=1');
  }

  async populateSchemaAndIndexingManager() {
    this.open()
    await browser.click({element: this.getElementByText('Populate Solr Managed Schema'), scroll: true})
    await this.switchToNestedIframe()
    await browser.click({element: this.getElementById('NextButton'), scroll: true})
    const populateSchemaSuccessMsg = await $('span=The search indexes have been populated.')
    await browser.waitUntil(async function() {
      return await populateSchemaSuccessMsg.isDisplayed()
    }, {timeout: 85000})
    const actualPopulateMsg = await populateSchemaSuccessMsg.getText()
    assert('The search indexes have been populated.' === actualPopulateMsg)
    await browser.click({element: this.getElementById('CancelButton'), scroll: true})
    await browser.click({element: this.getElementByText('Indexing manager'), scroll: true})
    await this.switchToNestedIframe()
    await browser.click({element: this.getElementById('dk_selectall_label'), scroll: true})
    await browser.click({element: this.getElementById('NextButton'), scroll: true})
    const indexingManagerSuccessMsg = await $('span=The search indexes have been rebuilt.')
    await browser.waitUntil(async function() {
      return await indexingManagerSuccessMsg.isDisplayed()
    }, {timeout: 95000})
    const actualIndexingManagerMsg = await indexingManagerSuccessMsg.getText()
    assert('The search indexes have been rebuilt.' === actualIndexingManagerMsg)
  }

}
module.exports = new ControlPanelPage();
