/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(path)
    }

    getElementByText(linkText) {
        return `*=${linkText}`
    }

    getElementById(linkText) {
        return `#${linkText}`
    }

    async switchToNestedIframe() {
       await browser.switchToFrame(await $('#jqueryModalDialogsFrame'))
        await browser.switchToFrame(await $('#scContentIframeId0'))
    }

    getXpathByID(id) {
        return `//*[@id="${id}"]`
    }


}
