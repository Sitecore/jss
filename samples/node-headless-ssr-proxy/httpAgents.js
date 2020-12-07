const keepAlive = require("agentkeepalive");
const http = require("http");
const https = require("https");

const keepAliveConfig = {
	maxSockets: 200,
	maxFreeSockets: 20,
	timeout: 240 * 1000,
	freeSocketTimeout: 240 * 1000,
};

const httpAgent = new keepAlive(keepAliveConfig);
const httpsAgent = new keepAlive.HttpsAgent(keepAliveConfig);

module.exports = {
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
  getAgent: (url) => {
		if (!url) {
			throw new Error("[KEEP-ALIVE-CONFIG] SITECORE_API_HOST value is required, but was undefined")
		}
	
		if (!url.indexOf("http://")) return httpAgent;
	
		if (!url.indexOf("https://")) return httpsAgent;
	
		throw new Error(
			"[KEEP-ALIVE-CONFIG] Unexpected SITECORE_API_HOST value, expected http:// or https://, but was " +
				url
		);
  },
};
