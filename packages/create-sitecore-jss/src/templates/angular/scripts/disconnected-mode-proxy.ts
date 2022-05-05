/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling the dev server to proxy requests to the API paths to this express instance.
*/

import * as fs from 'fs';
import { join } from 'path';
import { createDefaultDisconnectedServer, DisconnectedServerOptions } from '@sitecore-jss/sitecore-jss-dev-tools';
import { ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
import { environment } from '../src/environments/environment';

const config = (environment as {
  [key: string]: unknown;
  jssAppName: string;
  defaultLanguage: string
});

const touchToReloadFilePath = 'src/environments/environment.ts';

const proxyOptions: DisconnectedServerOptions = {
  appRoot: join(__dirname, '..'),
  appName: config.jssAppName,
  watchPaths: ['./data'],
  language: config.defaultLanguage,
  // Additional transpilation is not needed
  requireArg: null,
  port: 3043,
  onManifestUpdated: (_manifest: ManifestInstance) => {
    // if we can resolve the config file, we can alter it to force reloading the app automatically
    // instead of waiting for a manual reload. We must materially alter the _contents_ of the file to trigger
    // an actual reload, so we append "// reloadnow" to the file each time. This will not cause a problem,
    // since every build regenerates the config file from scratch and it's ignored from source control.
    if (fs.existsSync(touchToReloadFilePath)) {
      const currentFileContents = fs.readFileSync(touchToReloadFilePath, 'utf8');
      const newFileContents = `${currentFileContents}\n// reloadnow`;
      fs.writeFileSync(touchToReloadFilePath, newFileContents, 'utf8');

      console.log('Manifest data updated. Reloading the browser.');
    } else {
      console.log('Manifest data updated. Refresh the browser to see latest content!');
    }
  },
};

// Need to customize something that the proxy options don't support?
// createDefaultDisconnectedServer() is a boilerplate that you can copy from
// and customize the middleware registrations within as you see fit.
// See https://github.com/Sitecore/jss/blob/master/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts
createDefaultDisconnectedServer(proxyOptions);
