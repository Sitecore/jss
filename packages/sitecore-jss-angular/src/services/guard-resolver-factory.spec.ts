// tslint:disable: max-classes-per-file

import { Injectable, Injector } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { guardResolverFactory } from './guard-resolver-factory';
import { JssCanActivateRedirectError } from './jss-can-activate-error';
import {
  GUARD_RESOLVER,
  GuardResolver,
  JssCanActivate,
  JssCanActivateFn,
} from './placeholder.token';

const createLiteralGuard = (
  canActivate: boolean | Promise<boolean> | Observable<boolean>
): JssCanActivate => ({
  canActivate() {
    return canActivate;
  },
});

const createFunctionGuard = (canActivate: ReturnType<JssCanActivateFn>): JssCanActivateFn => () =>
  canActivate;

class MockSyncTrueGuard implements JssCanActivate {
  canActivate() {
    return true;
  }
}

class MockSyncFalseGuard implements JssCanActivate {
  canActivate() {
    return false;
  }
}

class MockAsyncTrueGuard implements JssCanActivate {
  canActivate() {
    return Promise.resolve(true);
  }
}

class MockAsyncFalseGuard implements JssCanActivate {
  canActivate() {
    return of(false);
  }
}

@Injectable({ providedIn: 'root' })
class MockService {
  readonly result = true;
}

@Injectable()
class MockInjectableGuard implements JssCanActivate {
  constructor(private service: MockService) {}

  canActivate() {
    return this.service.result;
  }
}

@Injectable()
class MockUrlTreeGuard implements JssCanActivate {
  constructor(private readonly router: Router) {}

  canActivate() {
    return this.router.parseUrl('/404');
  }
}

@Injectable()
class MockUrlGuard implements JssCanActivate {
  canActivate() {
    return '/404';
  }
}

@Injectable()
class MockUrlsGuard implements JssCanActivate {
  canActivate() {
    return ['404'];
  }
}

describe('guardResolverFactory', () => {
  let resolver: GuardResolver;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          MockSyncTrueGuard,
          MockSyncFalseGuard,
          MockAsyncTrueGuard,
          MockAsyncFalseGuard,
          MockService,
          MockInjectableGuard,
          MockUrlTreeGuard,
          MockUrlGuard,
          MockUrlsGuard,
          {
            provide: GUARD_RESOLVER,
            useFactory: guardResolverFactory,
            deps: [Injector, ActivatedRoute, Router],
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    resolver = TestBed.inject(GUARD_RESOLVER);
  });

  it('Returns rendering if single function sync guard returns true', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: createFunctionGuard(true),
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(1);
  });

  it('Returns rendering if single sync guard returns true', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: createLiteralGuard(true),
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(1);
  });

  it('Returns rendering if single async guard returns true', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: MockAsyncTrueGuard,
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(1);
  });

  it('Returns rendering if single injectable guard returns true', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: MockInjectableGuard,
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(1);
  });

  it('Throws JssCanActivateRedirectError when returning UrlTree', () => {
    return expectAsync(
      resolver([
        {
          canActivate: MockUrlTreeGuard,
          componentDefinition: {} as any,
        },
      ])
      // eslint-disable-next-line quotes
    ).toBeRejectedWithError(JssCanActivateRedirectError, "Value: '/404' is a redirect value");
  });

  it('Throws JssCanActivateRedirectError when returning string', () => {
    return expectAsync(
      resolver([
        {
          canActivate: MockUrlGuard,
          componentDefinition: {} as any,
        },
      ])
      // eslint-disable-next-line quotes
    ).toBeRejectedWithError(JssCanActivateRedirectError, "Value: '/404' is a redirect value");
  });

  it('Throws JssCanActivateRedirectError when returning array with strings', () => {
    return expectAsync(
      resolver([
        {
          canActivate: MockUrlsGuard,
          componentDefinition: {} as any,
        },
      ])
      // eslint-disable-next-line quotes
    ).toBeRejectedWithError(JssCanActivateRedirectError, "Value: '404' is a redirect value");
  });

  it('Blocks rendering if single async guard returns false', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: MockAsyncFalseGuard,
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(0);
  });

  it('Returns rendering if multiple guards all return true', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: [MockAsyncTrueGuard, createLiteralGuard(true), MockSyncTrueGuard],
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(1);
  });

  it('Does not return rendering if one guard returns false', async () => {
    const nonGuarded = await resolver([
      {
        canActivate: [MockAsyncTrueGuard, createLiteralGuard(false), MockSyncTrueGuard],
        componentDefinition: {} as any,
      },
    ]);

    expect(nonGuarded.length).toBe(0);
  });

  it('Only returns renderings of which all guards return true', async () => {
    const compFactoryResults = [
      {
        canActivate: [MockAsyncTrueGuard, createLiteralGuard(false), MockSyncTrueGuard],
        componentDefinition: 'Rendering 1' as any,
      },
      {
        canActivate: [MockAsyncTrueGuard, createLiteralGuard(true), MockSyncTrueGuard],
        componentDefinition: 'Rendering 2' as any,
      },
      {
        canActivate: [MockAsyncTrueGuard, createLiteralGuard(true), MockSyncFalseGuard],
        componentDefinition: 'Rendering 3' as any,
      },
      {
        canActivate: [MockAsyncFalseGuard, createLiteralGuard(true), MockSyncTrueGuard],
        componentDefinition: 'Rendering 4' as any,
      },
    ];

    const nonGuarded = await resolver(compFactoryResults);

    expect(nonGuarded.length).toBe(1);
    expect(nonGuarded[0]).toBe(compFactoryResults[1]);
  });
});
