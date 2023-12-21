import { Location } from '@angular/common';
import { Component, DebugElement, Injectable, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { JssModule } from './lib.module';
import { JssCanActivate, JssCanActivateFn, JssResolve } from './services/placeholder.token';
import { TestJumbotronComponent } from './test-data/test-jumbotron.component';

const testDataSuccess: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'Jumbotron',
            fields: {},
            params: {},
            uid: 'jumbotron-default',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with resolve',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronResolve',
            fields: {},
            params: {},
            uid: 'jumbotron-resolve',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with canActivate',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivate',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate',
          },
        ],
      },
    },
  },
];

const testDataNavigation: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron with canActivate with returning UrlTree',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUrlTree',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-url-tree',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with canActivate with returning url string',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUrlString',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-url-string',
          },
        ],
      },
    },
  },
];

const testDataError: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron with canActivate with return unexpected error',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUnknown',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-unexpected',
          },
        ],
      },
    },
  },
];

@Component({
  selector: 'test-placeholder',
  template: `
    <sc-placeholder
      name="main"
      [rendering]="rendering"
      (loaded)="loaded = $event"
      (failed)="failed = $event"
    >
      <img *scPlaceholderLoading src="loading.gif"
    /></sc-placeholder>
  `,
})
class TestPlaceholderComponent {
  @Input() rendering: ComponentRendering;
  loaded: string | undefined;
  failed: Error | undefined;
}

@Injectable()
class MockUrlTreeGuard implements JssCanActivate {
  constructor(private readonly router: Router) {}

  canActivate() {
    return this.router.parseUrl('/404');
  }
}

@Component({
  selector: 'not-found',
  template: `
    404
  `,
})
class NotFoundComponent {}

@Injectable()
class MockUnexpectedErrorGuard implements JssCanActivate {
  canActivate(): string {
    throw Error('something broke');
  }
}

describe('<sc-placeholder /> with lazy loaded modules', () => {
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestPlaceholderComponent;

  const loadChildrenFunc = () =>
    import('./test-data/test-jumbotron-lazy.module').then(
      (module) => module.TestJumbotronLazyModule
    );

  const createFunctionGuard = (canActivate: ReturnType<JssCanActivateFn>): JssCanActivateFn => () =>
    canActivate;

  const mockSyncResolver: JssResolve<string> = {
    resolve() {
      return 'Sync';
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestPlaceholderComponent, NotFoundComponent],
        imports: [
          RouterTestingModule.withRoutes([{ path: '404', component: NotFoundComponent }]),
          JssModule.withComponents(
            [],
            [
              {
                path: 'Jumbotron',
                loadChildren: loadChildrenFunc,
              },
              {
                path: 'JumbotronResolve',
                loadChildren: loadChildrenFunc,
                resolve: { sync: mockSyncResolver },
              },
              {
                path: 'JumbotronCanActivate',
                loadChildren: loadChildrenFunc,
                canActivate: [createFunctionGuard(true)],
              },
              {
                path: 'JumbotronCanActivateUrlTree',
                loadChildren: loadChildrenFunc,
                canActivate: [MockUrlTreeGuard],
              },
              {
                path: 'JumbotronCanActivateUrlString',
                loadChildren: loadChildrenFunc,
                canActivate: [createFunctionGuard('/404')],
              },
              {
                path: 'JumbotronCanActivateUnknown',
                loadChildren: loadChildrenFunc,
                canActivate: [MockUnexpectedErrorGuard],
              },
            ]
          ),
        ],
        providers: [MockUrlTreeGuard, MockUnexpectedErrorGuard],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlaceholderComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should show a loader while no rendering is defined yet', () => {
    const img = de.nativeElement.getElementsByTagName('img')[0];
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('loading.gif');
  });

  testDataSuccess.forEach((dataSet) => {
    describe(dataSet.label, () => {
      it(
        'should render a Jumbotron in placeholder',
        waitForAsync(async () => {
          comp.rendering = dataSet.data;

          await fixture.whenStable();
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          const jumbotron = de.query(By.directive(TestJumbotronComponent));
          expect(jumbotron).not.toBeNull();
          expect(jumbotron.nativeElement.innerHTML).toContain('Our best offer to date');

          const img = de.nativeElement.getElementsByTagName('img')[0];
          expect(img).not.toBeDefined();
        })
      );
    });
  });

  testDataNavigation.forEach((dataSet) => {
    describe(dataSet.label, () => {
      it(
        'should navigate to url',
        waitForAsync(async () => {
          comp.rendering = dataSet.data;

          await fixture.whenStable();
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          const location = TestBed.inject(Location);
          expect(location.path()).toBe('/404');
        })
      );
    });
  });
  testDataError.forEach((dataSet) => {
    describe(dataSet.label, () => {
      it(
        'should emit failure',
        waitForAsync(async () => {
          comp.rendering = dataSet.data;

          await fixture.whenStable();
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          expect(comp.failed).toEqual(new Error('something broke'));
        })
      );
    });
  });
});
