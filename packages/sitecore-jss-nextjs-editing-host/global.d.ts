import { EditingRequest } from '@sitecore-jss/sitecore-jss-nextjs';

// Extend Express Request with our custom EditingRequest
declare global {
  namespace Express {
      export interface Request extends EditingRequest {}
  }
}
