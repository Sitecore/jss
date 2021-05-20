module.exports = {
  click: async function({ element, scroll = false, index = -1, options = {} } = {}) {
    await browser.waitUntil(async function() {
      if (index >= 0) {
        return await (await $$(element))[index].isDisplayed();
      } else {
        return await $(element).isDisplayed();
      }
    }, options);
    let el;
    if (index >= 0) {
      el = await (await $$(element))[index];
    } else {
      el = await $(element);
    }
    if (scroll) {
      await el.scrollIntoView();
      await browser.pause(500);
    }
    await el.click();
  },
  type: async function({ element, type, scroll = false, index = -1, options = {} } = {}) {
    await browser.waitUntil(async function() {
      if (index >= 0) {
        return await (await $$(element))[index].isDisplayed();
      } else {
        return await $(element).isDisplayed();
      }
    }, options);
    let el;
    if (index >= 0) {
      el = await (await $$(element))[index];
    } else {
      el = await $(element);
    }
    if (scroll) {
      await el.scrollIntoView();
      await browser.pause(500);
    }
    await el.setValue(type);
  },
  clickByJS: async function(xpath) {
    return await browser.execute(async function(args) {
      await document
        .evaluate(args, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue.click();
    }, xpath);
  },
  typeByJS: function(xpath, type) {
    return browser.executeAsync(
      function(xpath, type) {
        document.evaluate(xpath, document).iterateNext().textContent = type;
      },
      xpath,
      type
    );
  },
  refreshUntilDisplayed: async function({ element, index = -1, maxTries = 3, options = {} } = {}) {
    for (let i = 0; i < maxTries; i++) {
      try {
        await browser.waitUntil(async function() {
          if (index >= 0) {
            return await (await $$(element))[index].isDisplayed();
          } else {
            return await $(element).isDisplayed();
          }
        }, options);
        break;
      } catch (e) {
        browser.refresh();
      }
    }
  },
  refreshUntilNotDisplayed: async function({
    element,
    index = -1,
    maxTries = 3,
    options = {},
  } = {}) {
    for (let i = 0; i < maxTries; i++) {
      try {
        await browser.waitUntil(async function() {
          if (index >= 0) {
            return await (await !$$(element))[index].isDisplayed();
          } else {
            return await !$(element).isDisplayed();
          }
        }, options);
        break;
      } catch (e) {
        browser.refresh();
      }
    }
  },
  displayed: async function({ element, index = -1, options = {} } = {}) {
    return await browser.waitUntil(async function() {
      if (index >= 0) {
        return await (await $$(element))[index].isDisplayed();
      } else {
        return await $(element).isDisplayed();
      }
    }, options);
  },
  notDisplayed: async function({ element, index = -1, options = {} } = {}) {
    try {
      await browser.waitUntil(async function() {
        if (index >= 0) {
          return await (await $$(element))[index].isDisplayed();
        } else {
          return await $(element).isDisplayed();
        }
      }, options);
      assert.fail('Expected element to not be visible but it is visible');
    } catch (e) {
      assert.ok('Expected element is not visible');
    }
  },
  clearField: async function() {
    await browser.keys(['\uE009', 'KeyA', '\uE003']);
    await browser.keys(['\uE009']);
  },
  typeWithKeys: async function(type) {
    await browser.keys([type]);
  },
};
