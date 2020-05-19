import { ɵisObservable as isObservable, ɵisPromise as isPromise } from '@angular/core';
import { from, Observable, of } from 'rxjs';

export type InnerType<T> = T extends Promise<infer P> ? P : T extends Observable<infer O> ? O : T;

export function wrapIntoObservable<T>(value: T): Observable<InnerType<T>> {
  if (isObservable(value)) {
    return value as any;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value)) as any;
  }

  return of(value) as any;
}
