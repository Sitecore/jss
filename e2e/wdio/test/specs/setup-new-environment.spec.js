const Base = require('../../base');
require('dotenv').config();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

describe('Setup new environment', function() {
  beforeAll(async function() {
    await Base.LoginPage.login();
  });

  it('Should prepare env', async function() {
    await Base.UserManagerPage.enableAdministratorPermissionForUser('JssImport');
    await Base.ControlPanelPage.populateSchemaAndIndexingManager();
    await Base.WorkboxPage.publishContentItems();
    console.log(await Base.ContentEditorPage.createApiKey());
  });
});
