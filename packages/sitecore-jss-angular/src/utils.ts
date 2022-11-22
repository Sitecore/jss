import { ɵisObservable as isObservable, ɵisPromise as isPromise } from '@angular/core';
import { from, Observable, of } from 'rxjs';

export type InnerType<T> = T extends Promise<infer P> ? P : T extends Observable<infer O> ? O : T;

/**
 * @param {T} value
 * @returns {Promise | Observable | any} resolved value
 */
export function wrapIntoObservable<T>(value: T): Observable<InnerType<T>> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return of(value) as any;
}
