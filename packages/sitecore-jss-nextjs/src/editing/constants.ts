export const QUERY_PARAM_EDITING_SECRET = 'secret';
export const QUERY_PARAM_VERCEL_PROTECTION_BYPASS = 'x-vercel-protection-bypass';
export const QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE = 'x-vercel-set-bypass-cookie';

/**
 * Headers that should be passed along to (Editing Chromes handler) SSR request.
 * Note these are in lowercase format to match expected `IncomingHttpHeaders`.
 */
export const EDITING_PASS_THROUGH_HEADERS = ['authorization', 'cookie'];

/**
 * Default allowed origins for editing requests. This is used to enforce CORS, CSP headers.
 */
export const EDITING_ALLOWED_ORIGINS = ['https://pages.sitecorecloud.io'];
