import { ServerBundle } from '@sitecore-jss/sitecore-jss-proxy';
import keepAlive from 'agentkeepalive';
import http from 'http';
import https from 'https';

const keepAliveConfig = {
  maxSockets: 200,
  maxFreeSockets: 20,
  timeout: 240 * 1000,
  freeSocketTimeout: 240 * 1000,
};

const httpAgent = new keepAlive(keepAliveConfig);
const httpsAgent = (new keepAlive.HttpsAgent(keepAliveConfig) as unknown) as https.Agent;

interface HttpAgentsConfig {
  setUpDefaultAgents: (serverBundle: ServerBundle) => void;
  getAgent: (url: string) => http.Agent | https.Agent;
}

export const httpAgentsConfig: HttpAgentsConfig = {
  setUpDefaultAgents: (serverBundle) => {
    http.globalAgent = httpAgent;
    https.globalAgent = httpsAgent;

    if (serverBundle.setUpDefaultAgents) {
      serverBundle.setUpDefaultAgents(httpAgent, httpsAgent);
    }
  },
  /**
   * Enable connection pooling. Adds `connection: keep-alive` header
   * @param {string} url api host
   */
  getAgent: (url: string) => {
    if (!url) {
      throw new Error('[KEEP-ALIVE-CONFIG] SITECORE_API_HOST value is required, but was undefined');
    }

    if (!url.indexOf('http://')) return httpAgent;

    if (!url.indexOf('https://')) return httpsAgent;

    throw new Error(
      '[KEEP-ALIVE-CONFIG] Unexpected SITECORE_API_HOST value, expected http:// or https://, but was ' +
        url
    );
  },
};
