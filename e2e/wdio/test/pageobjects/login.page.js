const Page = require('./page');

class LoginPage extends Page {

  async login (username=process.env.USER_NAME, password=process.env.PASSWORD) {
    this.open()
    await browser.type({element: this.getElementById('UserName'), type: username})
    await browser.type({element: this.getElementById('Password'), type: password})
    await browser.click({element: this.getElementById('LogInBtn')})
  }

  open () {
    return super.open('/sitecore/login?fbc=1');
  }
}

module.exports = new LoginPage();
