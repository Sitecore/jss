import chalk from 'chalk';

export const DEFAULT_M2M_ENDPOINT = 'https://auth.sitecorecloud.io/oauth/token';
export const DEFAULT_M2M_AUDIENCE = 'https://api.sitecorecloud.io';

export const fetchBearerToken = async () => {
  const audience = process.env.M2M_AUDIENCE || DEFAULT_M2M_AUDIENCE;
  const m2mEndpoint = process.env.M2M_ENDPOINT || DEFAULT_M2M_ENDPOINT;

  try {
    // TODO:adjust when M2M endpoint is live
    const authenticateResponse = await fetch(m2mEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.M2M_CLIENT_ID,
        client_secret: process.env.M2M_CLIENT_SECRET,
        audience: audience,
        grant_type: 'client_credentials',
      }),
    });
    const jsonResponse = await authenticateResponse.json();
    return jsonResponse.access_token;
  } catch (error) {
    console.error(chalk.red('Error authenticating with M2M token endpoint:', error));
    return null;
  }
};
