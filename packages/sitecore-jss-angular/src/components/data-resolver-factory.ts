import { Injector, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ComponentFactoryResult } from '../jss-component-factory.service';
import { wrapIntoObservable } from '../utils';
import { JssResolve } from './placeholder.token';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss';

export function dataResolverFactory(
  injector: Injector,
  activatedRoute: ActivatedRoute,
  router: Router
) {
  function _getResolverInstance(resolver: JssResolve<any> | Type<JssResolve<any>>) {
    return 'resolve' in resolver ? resolver : injector.get(resolver);
  }

  function _collectResolverInstances(
    factory: ComponentFactoryResult
  ): Array<[string, JssResolve<any>]> {
    if (factory.resolve != null) {
      const resolve = factory.resolve;
      return Object.keys(factory.resolve).map(
        (key): [string, JssResolve<any>] => [key, _getResolverInstance(resolve[key])]
      );
    }

    return [];
  }

  function _resolveData(resolver: JssResolve<any>, factory: ComponentFactoryResult) {
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
        const resolvers = _collectResolverInstances(factory);
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
