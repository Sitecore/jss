import { UrlTree } from '@angular/router';

/**
 * Error thrown when a JssCanActivate guard fails to resolve.
 */
export class JssCanActivateError extends Error {
  constructor(public message: string, public redirectValue: string | string[] | UrlTree) {
    super(message);
    this.name = 'JssCanActivateError';
  }
}
