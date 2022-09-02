// Mock fetch/Request for nextjs middleware

const crossFetch = require('cross-fetch');

global.fetch = crossFetch;
global.Headers = crossFetch.Headers;
global.Request = crossFetch.Request;
global.Response = crossFetch.Response;
