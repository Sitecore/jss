import { UrlTree } from '@angular/router';

/**
 * Error thrown when a JssCanActivate guard returns a redirect value.
 * The redirect value will be used to redirect the user to a different route.
 */
export class JssCanActivateRedirectError extends Error {
  constructor(public message: string, public redirectValue: string | string[] | UrlTree) {
    super(message);
    this.name = 'JssCanActivateRedirectError';
  }
}
