import { expect } from 'chai';
import { RedirectService, LocalRedirects } from './redirect-service';
import { NextRequest } from 'next/server';
import { spy } from 'sinon';

const redirectsJson = {
  '/404': { destination: '/nofound' },
} as LocalRedirects;

const mockRequest = () => {
  const request = {
    get nextUrl(): any {
      return {
        clone: spy<any>(() => {
          return Promise.resolve({ data });
        })
      }
    }
  } as NextRequest;
}
describe('RedirectService', () => {
  const redirectService = new RedirectService(redirectsJson);

  it('should generate sitemap', () => {
    redirectService.redirect()
  });
});
