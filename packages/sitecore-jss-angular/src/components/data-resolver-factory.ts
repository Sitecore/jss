import { Injector, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { take } from 'rxjs/operators';
import { ComponentFactoryResult } from '../jss-component-factory.service';
import { wrapIntoObservable } from '../utils';
import { JssResolve } from './placeholder.token';

/**
 * @param {Injector} injector
 * @param {ActivatedRoute} activatedRoute
 * @param {Router} router
 * @returns resolved data
 */
export function dataResolverFactory(
  injector: Injector,
  activatedRoute: ActivatedRoute,
  router: Router
) {
  /**
   * @param {JssResolve<unknown> | Type<JssResolve<unknown>>} resolver
   * @returns resolver instance
   */
  function getResolverInstance(resolver: JssResolve<unknown> | Type<JssResolve<unknown>>) {
    return 'resolve' in resolver ? resolver : injector.get(resolver);
  }

  /**
   * @param {ComponentFactoryResult} factory
   * @returns {Array<[string, JssResolve<unknown>]>} resolver instances
   */
  function collectResolverInstances(
    factory: ComponentFactoryResult
  ): Array<[string, JssResolve<unknown>]> {
    if (factory.resolve) {
      const resolve = factory.resolve;
      return Object.keys(factory.resolve).map((key): [string, JssResolve<unknown>] => [
        key,
        getResolverInstance(resolve[key]),
      ]);
    }

    return [];
  }

  /**
   * @param {JssResolve<unknown>} resolver
   * @param {ComponentFactoryResult} factory
   * @returns data
   */
  function _resolveData(resolver: JssResolve<unknown>, factory: ComponentFactoryResult) {
    const data = resolver.resolve({
      activatedRoute: activatedRoute.snapshot,
      routerState: router.routerState.snapshot,
      rendering: factory.componentDefinition as ComponentRendering,
    });
    const data$ = wrapIntoObservable(data);

    return data$.pipe(take(1)).toPromise();
  }

  return function resolveData(factories: ComponentFactoryResult[]) {
    return Promise.all(
      factories.map((factory) => {
        const resolvers = collectResolverInstances(factory);
        const pendingData = resolvers.map(([key, resolver]) =>
          _resolveData(resolver, factory).then((data): [string, any] => [key, data])
        );

        return Promise.all(pendingData)
          .then((allData) =>
            allData.reduce<Record<string, any>>((acc, [key, data]) => {
              acc[key] = data;
              return acc;
            }, {})
          )
          .then((data) => ({ factory, data }));
      })
    );
  };
}
