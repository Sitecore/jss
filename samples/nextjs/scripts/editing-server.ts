/*
  This script starts the Editing Server, which is a custom (Express-based) Next.js
  app with the middleware required to support the Sitecore Experience Editor.
  By default, this will spin up at localhost:3000, but can be configured with the
  `EditingServerOptions` parameter.

  This should be set as the Http rendering engine in your Sitecore configuration
  (already complete in the included sample \sitecore\config\JssNextWeb.config).
  See https://jss.sitecore.com/docs/fundamentals/services/view-engine

  For local development, you may wish to utilize ngrok to proxy requests, which can
  be helpful for certain firewall configurations or testing remote instances
  via the 'sc_httprenderengineurl' query string paramter.
  See https://ngrok.com
*/

import { startEditingServer } from '@sitecore-jss/sitecore-jss-nextjs-editing-host';

startEditingServer();
