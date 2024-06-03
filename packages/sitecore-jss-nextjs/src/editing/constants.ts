export const QUERY_PARAM_EDITING_SECRET = 'secret';
export const QUERY_PARAM_PROTECTION_BYPASS_SITECORE = 'x-sitecore-protection-bypass';
export const QUERY_PARAM_PROTECTION_BYPASS_VERCEL = 'x-vercel-protection-bypass';
/**
 * Default allowed origins for editing requests. This is used to enforce CORS, CSP headers.
 */
export const EDITING_ALLOWED_ORIGINS = ['https://pages*.cloud', 'https://pages.sitecorecloud.io'];
