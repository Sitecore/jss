const ContentEditorPage = require('./test/pageobjects/content-editor.page')
const ControlPanelPage = require('./test/pageobjects/control-panel.page')
const ExperienceEditorPage = require('./test/pageobjects/experience-editor.page')
const LoginPage = require('./test/pageobjects/login.page')
const UserManagerPage = require('./test/pageobjects/user-manager.page')
const WorkboxPage = require('./test/pageobjects/workbox.page')
const crypto = require('crypto')

class Base {

  randomStr() {
    return crypto.randomBytes(20).toString('hex');
  }

}
module.exports = {
  Base: new Base(),
  ContentEditorPage: ContentEditorPage,
  ControlPanelPage: ControlPanelPage,
  ExperienceEditorPage: ExperienceEditorPage,
  LoginPage: LoginPage,
  UserManagerPage: UserManagerPage,
  WorkboxPage: WorkboxPage
}
