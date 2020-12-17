/*
  This script starts the Editing Server, which is a custom (Express-based) Next.js
  app with the middleware required to support the Sitecore Experience Editor.
  By default, this will spin up at localhost:3000, but can be configured with the
  `EditingServerOptions` parameter.

  Your Sitecore CM instance will need to be able to access this endpoint. If your
  public endpoint is different, you will need to set the `EDITING_HOST_PUBLIC_URL`
  environment variable (see .env). This is set to http://localhost:3000 by default.

  For local development, for example, you may wish to utilize ngrok to proxy requests,
  which can be helpful for certain firewall configurations or testing remote instances
  via the 'sc_httprenderengineurl' query string paramter.
  See https://ngrok.com

  This endpoint should match the HTTP rendering engine in your Sitecore configuration
  (see \sitecore\config\JssNextWeb.config). Be sure to update the `serverSideRenderingEngineEndpointUrl`
  accordingly as your Editing Server configuration / public endpoint changes.
  See https://jss.sitecore.com/docs/fundamentals/services/view-engine
*/

import { startEditingServer } from '@sitecore-jss/sitecore-jss-nextjs-editing-host';

startEditingServer();
