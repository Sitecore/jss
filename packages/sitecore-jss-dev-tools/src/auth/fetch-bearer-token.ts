import chalk from 'chalk';

export const DEFAULT_SITECORE_AUTH_ENDPOINT = 'https://auth.sitecorecloud.io/oauth/token';
export const DEFAULT_SITECORE_AUTH_AUDIENCE = 'https://api.sitecorecloud.io';

/**
 * Connects to M2M endpoint and fetches the bearer token
 * Uses client_id and client_secret from environment variables
 * @returns {string} bearer token string
 */
export const fetchBearerToken = async () => {
  const audience = process.env.SITECORE_AUTH_AUDIENCE || DEFAULT_SITECORE_AUTH_AUDIENCE;
  const m2mEndpoint = process.env.SITECORE_AUTH_ENDPOINT || DEFAULT_SITECORE_AUTH_ENDPOINT;

  try {
    // TODO:adjust when M2M endpoint is live
    const authenticateResponse = await fetch(m2mEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SITECORE_AUTH_CLIENT_ID,
        client_secret: process.env.SITECORE_AUTH_CLIENT_SECRET,
        audience: audience,
        grant_type: 'client_credentials',
      }),
    });
    if (!authenticateResponse.ok) {
      throw new Error(
        `Status: ${authenticateResponse.status} Mesage: ${authenticateResponse.statusText}`
      );
    }
    const jsonResponse = await authenticateResponse.json();
    return jsonResponse.access_token;
  } catch (error) {
    console.error(chalk.red('Error authenticating with Sitecore Auth endpoint:', error));
    console.log(
      chalk.yellow(
        'Please ensure your SITECORE_AUTH_CLIENT_ID and SITECORE_AUTH_CLIENT_SECRET environment variables are set correctly.'
      )
    );
    return null;
  }
};
