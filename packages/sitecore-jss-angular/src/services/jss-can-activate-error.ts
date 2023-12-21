import { UrlTree } from '@angular/router';

export class JssCanActivateError extends Error {
  constructor(public message: string, public redirectValue: string | string[] | UrlTree) {
    super(message);
    this.name = 'JssCanActivateError';
  }
}
