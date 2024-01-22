import { ɵisPromise as isPromise } from '@angular/core';
import { from, Observable, isObservable, of } from 'rxjs';

/**
 * @param {T} value
 * @returns {Promise | Observable | any} resolved value
 */
export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return of(value) as any;
}
