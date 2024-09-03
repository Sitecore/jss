import {
  Component,
  DebugElement,
  EventEmitter,
  Injectable,
  Input,
  Output,
  TemplateRef,
  TransferState,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { JssModule } from '../lib.module';
import { convertedData as eeData } from '../test-data/ee-data';
import {
  convertedDevData as nonEeDevData,
  convertedLayoutServiceData as nonEeLsData,
  sxaRenderingData,
  sxaRenderingDynamicPlaceholderData,
  sxaRenderingDoubleDigitDynamicPlaceholderData,
} from '../test-data/non-ee-data';
import * as metadataData from '../test-data/metadata-data';
import { LazyComponent } from '../test-data/lazy-loading/lazy-component.component';
import { JssCanActivate, JssCanActivateFn, JssResolve } from '../services/placeholder.token';
import * as lazyLoadingData from '../test-data/lazy-loading/data';
import { AngularContextService, AngularLayoutService, JssState } from '../services/models';
@Component({
  selector: 'test-placeholder',
  template: `
    <sc-placeholder [name]="name" [rendering]="rendering">
      <img *scPlaceholderLoading src="loading.gif" />
    </sc-placeholder>
  `,
})
class TestPlaceholderComponent {
  @Input() rendering: ComponentRendering;
  @Input() name: string;
}

@Component({
  selector: 'test-download-callout',
  template: `
    {{ rendering?.fields?.linkText?.value }}
  `,
})
class TestDownloadCalloutComponent {
  @Input() rendering: ComponentRendering;
}

@Component({
  selector: 'test-home',
  styles: ['sc-placeholder[name="page-content"] { background-color: red }'],
  template: `
    <sc-placeholder name="page-header" [rendering]="rendering"></sc-placeholder>
    <sc-placeholder name="page-content" [rendering]="rendering"></sc-placeholder>
  `,
})
class TestHomeComponent {
  @Input() rendering: ComponentRendering;
}

@Component({
  selector: 'test-jumbotron',
  template: '',
})
class TestJumbotronComponent {}

describe('<sc-placeholder />', () => {
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestPlaceholderComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestPlaceholderComponent,
          TestDownloadCalloutComponent,
          TestHomeComponent,
          TestJumbotronComponent,
        ],
        imports: [
          RouterTestingModule,
          JssModule.withComponents(
            [
              { name: 'DownloadCallout', type: TestDownloadCalloutComponent },
              { name: 'Home', type: TestHomeComponent },
              { name: 'Jumbotron', type: TestJumbotronComponent },
            ],
            [
              {
                path: 'LazyComponent',
                loadChildren: () =>
                  import('../test-data/lazy-loading/lazy-loading.module').then(
                    (m) => m.TestLazyLoadingModule
                  ),
              },
            ]
          ),
        ],
        providers: [],
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

  const testData = [
    { label: 'Dev data', data: nonEeDevData },
    { label: 'LayoutService data - EE off', data: nonEeLsData },
    { label: 'LayoutService data - EE on', data: eeData },
  ];

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it(
        'should render a placeholder with given key',
        waitForAsync(async () => {
          const component = (dataSet.data.sitecore.route.placeholders
            .main as ComponentRendering[]).find((c) => c.componentName);
          const phKey = 'page-content';
          comp.name = phKey;
          comp.rendering = component!;
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          const downloadCallout = de.query(By.directive(TestDownloadCalloutComponent));
          expect(downloadCallout).not.toBeNull();
          expect(downloadCallout.nativeElement.innerHTML).toContain('Download');

          const lazyComponent = de.query(By.directive(LazyComponent));
          expect(lazyComponent).not.toBeNull();
          expect(lazyComponent.nativeElement.innerHTML).toContain('Push');

          const img = de.nativeElement.getElementsByTagName('img')[0];
          expect(img).not.toBeDefined();
        })
      );

      it(
        'should render nested placeholders',
        waitForAsync(async () => {
          const component = dataSet.data.sitecore.route;
          const phKey = 'main';
          comp.name = phKey;
          comp.rendering = (component as unknown) as ComponentRendering;
          fixture.detectChanges();

          // because nested placeholders result in additional async loading _after_ whenStable,
          // we have to check for stability AGAIN internally
          await fixture.whenStable();
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          const downloadCallout = de.query(By.directive(TestDownloadCalloutComponent));
          expect(downloadCallout).not.toBeNull();
          expect(downloadCallout.nativeElement.innerHTML).toContain('Download');
        })
      );
    });
  });

  it(
    'should populate the "key" attribute of placeholder chrome',
    waitForAsync(async () => {
      const component = eeData.sitecore.route;
      const phKey = 'main';

      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const eeChrome = de.nativeElement.querySelector(
        `[chrometype="placeholder"][kind="open"][id="${phKey}"]`
      );
      expect(eeChrome).not.toBeNull();

      const keyAttribute = eeChrome.getAttribute('key');
      expect(keyAttribute).toBeDefined();
      expect(keyAttribute).toBe(phKey);
    })
  );

  it(
    'should copy parent style attribute',
    waitForAsync(async () => {
      const component = nonEeDevData.sitecore.route;
      const phKey = 'main';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      // let's grab the style name from the parent
      let parentKey = '';
      const homeComp = de.query(By.directive(TestHomeComponent));
      const homeAttributes = homeComp.nativeElement.attributes;
      if (homeAttributes.length) {
        const parentAttribute = homeComp.nativeElement.attributes.item(0).name;
        parentKey = parentAttribute.replace('_nghost-', '');
      }

      await fixture.whenStable();
      fixture.detectChanges();

      const downloadCallout = de.query(By.directive(TestDownloadCalloutComponent));
      expect(downloadCallout.nativeElement.attributes.item(0).name).toEqual(
        `_ngcontent-${parentKey}`
      );
    })
  );

  it(
    'should skip rendering unknown components',
    waitForAsync(async () => {
      const phKey = 'main';
      const route = {
        placeholders: {
          main: [
            {
              componentName: 'Home',
            },
            {
              componentName: 'whatisthis',
            },
          ],
        },
      };

      comp.name = phKey;
      comp.rendering = (route as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const homeDiv = de.query(By.directive(TestHomeComponent));
      expect(homeDiv).not.toBeNull();
    })
  );

  it(
    'should skip rendering components with no name',
    waitForAsync(async () => {
      const phKey = 'main';
      const route = {
        placeholders: {
          main: [
            {
              componentName: 'Home',
            },
            {
              componentName: null,
            },
          ],
        },
      };

      comp.name = phKey;
      comp.rendering = (route as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const homeDiv = de.query(By.directive(TestHomeComponent));
      expect(homeDiv).not.toBeNull();
    })
  );

  it(
    'should render null for unknown placeholder',
    waitForAsync(async () => {
      const phKey = 'unknown';
      const route = {
        placeholders: {
          main: [
            {
              componentName: 'Home',
            },
          ],
        },
      };

      comp.name = phKey;
      comp.rendering = (route as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const element = de.query(By.css('sc-placeholder')).nativeElement;
      expect(element.children.length).toBe(0);
    })
  );
});

@Component({
  selector: 'test-parent',
  template: `
    <sc-placeholder
      [name]="name"
      [rendering]="rendering"
      [inputs]="inputs"
      [outputs]="outputs"
    ></sc-placeholder>
    {{ clickMessage }}
  `,
})
class TestParentComponent {
  @Input() rendering: ComponentRendering;
  @Input() name: string;
  clickMessage = '';
  public inputs = {
    childMessage: '',
    childNumber: () => 40 + 2,
  };
  public outputs = {
    childEvent: (childEvent: string) => {
      this.clickMessage = childEvent;
    },
  };
  @Input() set childMessage(message: string) {
    this.inputs.childMessage = message;
  }
}

@Component({
  selector: 'test-child',
  template: `
    {{ childMessage }}
    {{ childNumber() }}
    <button (click)="triggerEvent()">Button</button>
  `,
})
class TestChildComponent {
  @Input() childMessage: string;
  @Input() childNumber: number;
  @Output() childEvent: EventEmitter<string> = new EventEmitter<string>();

  triggerEvent() {
    this.childEvent.emit('dolor');
  }
}

describe('<sc-placeholder /> with input/output binding', () => {
  let fixture: ComponentFixture<TestParentComponent>;
  let de: DebugElement;
  let comp: TestParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestParentComponent, TestChildComponent],
      imports: [
        RouterTestingModule,
        JssModule.withComponents([
          { name: 'Parent', type: TestParentComponent },
          { name: 'Child', type: TestChildComponent },
        ]),
      ],
      providers: [],
    });

    fixture = TestBed.createComponent(TestParentComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should bind inputs to children',
    waitForAsync(async () => {
      const expectedMessage = 'lorem';
      const functionResult = 42;
      const changedMessage = 'ipsum';

      comp.rendering = ({
        placeholders: {
          children: [
            {
              componentName: 'Child',
            },
          ],
        },
      } as unknown) as ComponentRendering;
      comp.name = 'children';
      comp.childMessage = expectedMessage;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const childComponent = de.query(By.directive(TestChildComponent));
      expect(childComponent.nativeElement.innerHTML).toContain(expectedMessage);
      expect(childComponent.nativeElement.innerHTML).toContain(functionResult);
      comp.childMessage = changedMessage;
      fixture.detectChanges();
      expect(childComponent.nativeElement.innerHTML).toContain(changedMessage);
    })
  );

  it(
    'should bind inputs to multiple',
    waitForAsync(async () => {
      const expectedMessage = 'lorem';

      comp.rendering = ({
        placeholders: {
          children: [
            {
              componentName: 'Child',
            },
            {
              componentName: 'Child',
            },
            {
              componentName: 'Child',
            },
          ],
        },
      } as unknown) as ComponentRendering;
      comp.name = 'children';
      comp.childMessage = expectedMessage;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const childComponents = de.queryAll(By.directive(TestChildComponent));
      expect(childComponents.length).toBe(3);
      childComponents.forEach((childComponent) => {
        expect(childComponent.nativeElement.innerHTML).toContain(expectedMessage);
      });
    })
  );

  it(
    'should bind outputs to children',
    waitForAsync(async () => {
      comp.rendering = ({
        placeholders: {
          children: [
            {
              componentName: 'Child',
            },
          ],
        },
      } as unknown) as ComponentRendering;
      comp.name = 'children';
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const button = de.query(By.css('button'));
      button.nativeElement.click();
      fixture.detectChanges();

      expect(de.nativeElement.innerHTML).toContain('dolor');
    })
  );
});

@Component({
  selector: 'test-lazy-placeholder',
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
class TestLazyPlaceholderComponent {
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

@Component({
  selector: 'test-jumbotron',
  template: '<h1>Our best offer to date</h1>',
})
export class TestLazyJumbotronComponent {}

describe('<sc-placeholder /> with lazy loaded modules', () => {
  let fixture: ComponentFixture<TestLazyPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestLazyPlaceholderComponent;

  const loadChildrenFunc = () =>
    import('../test-data/lazy-loading/lazy-loading.module').then(
      (module) => module.TestLazyLoadingModule
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
        declarations: [TestLazyPlaceholderComponent, NotFoundComponent],
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
    fixture = TestBed.createComponent(TestLazyPlaceholderComponent);
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

  lazyLoadingData.testDataSuccess.forEach((dataSet) => {
    describe(dataSet.label, () => {
      it(
        'should render a Jumbotron in placeholder',
        waitForAsync(async () => {
          comp.rendering = dataSet.data;

          await fixture.whenStable();
          fixture.detectChanges();

          await fixture.whenStable();
          fixture.detectChanges();

          const jumbotron = de.query(By.directive(LazyComponent));
          expect(jumbotron).not.toBeNull();
          expect(jumbotron.nativeElement.innerHTML).toContain('Hello world');

          const img = de.nativeElement.getElementsByTagName('img')[0];
          expect(img).not.toBeDefined();
        })
      );
    });
  });

  lazyLoadingData.testDataNavigation.forEach((dataSet) => {
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
  lazyLoadingData.testDataError.forEach((dataSet) => {
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

@Component({
  selector: 'test-rich-text',
  template: `
    <ng-template #default>
      <span class="default">Rich text</span>
    </ng-template>

    <ng-template #withTitle>
      <div class="title" *scText="rendering.fields.Title"></div>
      <div class="text" *scText="rendering.fields.Text"></div>
    </ng-template>

    <div class="rendering-variant {{ rendering.params.styles }}">
      <ng-container [ngTemplateOutlet]="variant"></ng-container>
    </div>
  `,
})
class TestRichTextComponent {
  @Input() rendering: ComponentRendering;
  @ViewChild('default', { static: true }) defaultVariant: TemplateRef<any>;
  @ViewChild('withTitle', { static: true }) withTitleVariant: TemplateRef<any>;
  public get variant(): TemplateRef<any> {
    return this.rendering.params?.FieldNames === 'WithTitle'
      ? this.withTitleVariant
      : this.defaultVariant;
  }
}

describe('SXA components', () => {
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestPlaceholderComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestPlaceholderComponent, TestRichTextComponent],
        imports: [
          RouterTestingModule,
          JssModule.withComponents([{ name: 'RichText', type: TestRichTextComponent }]),
        ],
        providers: [],
      });

      fixture = TestBed.createComponent(TestPlaceholderComponent);
      de = fixture.debugElement;

      comp = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it(
    'should render',
    waitForAsync(async () => {
      const component = sxaRenderingData.sitecore.route;
      const phKey = 'main';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const richText = de.query(By.directive(TestRichTextComponent));
      expect(richText).not.toBeNull();
      expect(richText.nativeElement.innerHTML).toContain('rendering-variant');

      const container = de.query(By.css('.rendering-variant'));
      expect(container).not.toBeNull();
      expect(container.attributes.class).toEqual(
        'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 rendering-variant test-css-class-x'
      );

      const title = de.query(By.css('.title'));
      expect(title).not.toBeNull();
      expect(title.nativeElement.innerHTML).toEqual('Rich Text Rendering Variant');

      const text = de.query(By.css('.text'));
      expect(text).not.toBeNull();
      expect(text.nativeElement.innerHTML).toEqual('Test RichText');
    })
  );

  it(
    'should render another rendering variant',
    waitForAsync(async () => {
      const component = sxaRenderingData.sitecore.route;
      const phKey = 'main-second';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const richText = de.query(By.directive(TestRichTextComponent));
      expect(richText).not.toBeNull();
      expect(richText.nativeElement.innerHTML).toContain('rendering-variant');

      const container = de.query(By.css('.rendering-variant'));
      expect(container).not.toBeNull();
      expect(container.attributes.class).toEqual(
        'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 rendering-variant test-css-class-y'
      );

      const span = de.query(By.css('.default'));
      expect(span).not.toBeNull();
      expect(span.nativeElement.innerHTML).toEqual('Rich text');
    })
  );

  it(
    'should render with container-{*} type dynamic placeholder',
    waitForAsync(async () => {
      const component = sxaRenderingDynamicPlaceholderData.sitecore.route;
      const phKey = 'container-1';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const richText = de.query(By.directive(TestRichTextComponent));
      expect(richText).not.toBeNull();
      expect(richText.nativeElement.innerHTML).toContain('rendering-variant');
    })
  );

  it(
    'should render with dynamic-1-{*} type dynamic placeholder',
    waitForAsync(async () => {
      const component = sxaRenderingDoubleDigitDynamicPlaceholderData.sitecore.route;
      const phKey = 'dynamic-1-{*}';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);

      const richText = de.query(By.directive(TestRichTextComponent));
      expect(richText).not.toBeNull();
      expect(richText.nativeElement.innerHTML).toContain('rendering-variant');
    })
  );
});

fdescribe('PlaceholderMetadata', () => {
  @Component({
    selector: 'test-text',
    template: `
      <span id="text" *scText="rendering.fields.text"></span>
    `,
  })
  class TestTextComponent {
    @Input() rendering: ComponentRendering;
  }

  @Injectable()
  class TestContextService extends AngularContextService {
    constructor(
      protected stateOverride: JssState,
      protected transferState: TransferState,
      protected layoutService: AngularLayoutService
    ) {
      super(transferState, layoutService);
      this.state.next(this.stateOverride);
    }
    setState(state: JssState) {
      this.state.next(state);
    }
  }

  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestPlaceholderComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestTextComponent, TestPlaceholderComponent],
        imports: [
          RouterTestingModule,
          JssModule.withComponents([{ name: 'Home', type: TestTextComponent }]),
        ],
        providers: [
          AngularLayoutService,
          { provide: JssState, useValue: layoutData.sitecore.context },
          { provide: AngularContextService, useClass: TestContextService },
        ],
      });

      fixture = TestBed.createComponent(TestPlaceholderComponent);
      de = fixture.debugElement;

      comp = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  const {
    layoutData,
    // layoutDataForNestedDynamicPlaceholder,
    // layoutDataWithEmptyPlaceholder,
    // layoutDataWithUnknownComponent,
  } = metadataData;

  it(
    'should render code blocks around nested placeholder components',
    waitForAsync(async () => {
      const component = layoutData.sitecore.route;
      const phKey = 'main';
      comp.name = phKey;
      comp.rendering = (component as unknown) as ComponentRendering;

      const jssContext = de.injector.get(AngularContextService) as TestContextService;
      jssContext.state.next(layoutData);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(de.children.length).toBe(1);
      const text = de.query(By.css('#text'));
      expect(text.nativeElement.nextSibling.innerHTML).toBe('code');
      expect(text.nativeElement.previousSibling.innerHTML).toBe('code');
    })
  );

  xit('should render code blocks even if placeholder is empty', () => {
    expect(true).toBe(false);
  });

  xit('should render missing component with code blocks if component is not registered', () => {
    expect(true).toBe(false);
  });

  xit('should render dynamic placeholder', () => {
    expect(true).toBe(false);
  });

  xit('should render double digit dynamic placeholder', () => {
    expect(true).toBe(false);
  });
});
