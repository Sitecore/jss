// tslint:disable:max-classes-per-file
import { Component, DebugElement, EventEmitter, Input, NgModuleFactoryLoader, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';

import { JssModule } from '../lib.module';

import { convertedData as eeData } from '../testData/ee-data';
import { convertedDevData as nonEeDevData, convertedLayoutServiceData as nonEeLsData } from '../testData/non-ee-data';

@Component({
  selector: 'test-placeholder',
  template: `
    <sc-placeholder [name]="name" [rendering]="rendering">
      <img *scPlaceholderLoading src="loading.gif">
    </sc-placeholder>
  `,
})
class TestPlaceholderComponent {
  @Input() rendering: any;
  @Input() name: string;
}

@Component({
  selector: 'test-download-callout',
  template: `
    {{ rendering?.fields?.linkText?.value }}
  `,
})
class TestDownloadCalloutComponent {
  @Input() rendering: any;
}

@Component({
  selector: 'test-home',
  template: `
    <sc-placeholder name="page-header" [rendering]="rendering"></sc-placeholder>
    <sc-placeholder name="page-content" [rendering]="rendering"></sc-placeholder>
  `,
})
class TestHomeComponent {
  @Input() rendering: any;
}

@Component({
  selector: 'test-jumbotron',
  template: ``,
})
class TestJumbotronComponent { }

describe('<sc-placeholder />', () => {
  let fixture: ComponentFixture<TestPlaceholderComponent>;
  let de: DebugElement;
  let comp: TestPlaceholderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestPlaceholderComponent,
        TestDownloadCalloutComponent,
        TestHomeComponent,
        TestJumbotronComponent,
      ],
      imports: [
        JssModule.withComponents([
          { name: 'DownloadCallout', type: TestDownloadCalloutComponent },
          { name: 'Home', type: TestHomeComponent },
          { name: 'Jumbotron', type: TestJumbotronComponent },
        ]),
      ],
      providers: [
        { provide: NgModuleFactoryLoader, value: SpyNgModuleFactoryLoader },
      ],
    }).compileComponents();
  }));

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

  testData.forEach((dataSet: any) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', async(() => {
        const component = dataSet.data.sitecore.route.placeholders.main.find((c: any) => c.componentName);
        const phKey = 'page-content';
        comp.name = phKey;
        comp.rendering = component;
        fixture.detectChanges();

        fixture.whenStable()
        .then(() => {
          fixture.detectChanges();

          const downloadCallout = de.query(By.directive(TestDownloadCalloutComponent));
          expect(downloadCallout).not.toBeNull();
          expect(downloadCallout.nativeElement.innerHTML).toContain('Download');

          const img = de.nativeElement.getElementsByTagName('img')[0];
          expect(img).not.toBeDefined();
        });
      }));

      it('should render nested placeholders', async(() => {
        const component = dataSet.data.sitecore.route;
        const phKey = 'main';
        comp.name = phKey;
        comp.rendering = component;
        fixture.detectChanges();

        // because nested placeholders result in additional async loading _after_ whenStable,
        // we have to check for stability AGAIN internally
        fixture.whenStable()
          .then(() => {
            fixture.detectChanges();

            fixture.whenStable()
              .then(() => {
                fixture.detectChanges();
                const downloadCallout = de.query(By.directive(TestDownloadCalloutComponent));
                expect(downloadCallout).not.toBeNull();
                expect(downloadCallout.nativeElement.innerHTML).toContain('Download');
              });
          });
      }));
    });
  });

  it('should populate the "key" attribute of placeholder chrome', async(() => {
    const component = eeData.sitecore.route;
    const phKey = 'main';

    comp.name = phKey;
    comp.rendering = component;
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();

        const eeChrome = de.query(By.css(`[chrometype="placeholder"][kind="open"][id="${phKey}"]`));
        expect(eeChrome).not.toBeNull();

        const keyAttribute = eeChrome.nativeElement.getAttribute('key');
        expect(keyAttribute).toBeDefined();
        expect(keyAttribute).toBe(phKey);
      });
  }));

  it('should skip rendering unknown components', async(() => {
    const phKey = 'main';
    const route = {
      placeholders: {
        main: [{
          componentName: 'Home',
        }, {
          componentName: 'whatisthis',
        }],
      },
    };

    comp.name = phKey;
    comp.rendering = route;
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();

        expect(de.children.length).toBe(1);

        const homeDiv = de.query(By.directive(TestHomeComponent));
        expect(homeDiv).not.toBeNull();
      });
  }));

  it('should render null for unknown placeholder', async(() => {
    const phKey = 'unknown';
    const route = {
      placeholders: {
        main: [{
          componentName: 'Home',
        }],
      },
    };

    comp.name = phKey;
    comp.rendering = route;
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();

        const element = de.query(By.css('sc-placeholder')).nativeElement;
        expect(element.children.length).toBe(0);
      });
  }));
});

@Component({
  selector: 'test-parent',
  template: `
    <sc-placeholder [name]="name" [rendering]="rendering" [inputs]="inputs" [outputs]="outputs"></sc-placeholder>
    {{ clickMessage }}
  `,
})
class TestParentComponent {
  clickMessage = '';
  @Input() rendering: any;
  @Input() name: string;
  @Input() set childMessage(message: string) {
    this.inputs.childMessage = message;
  }
  public inputs = {
    childMessage: '',
    childNumber: () => 40 + 2,
  };
  public outputs = {
    childEvent: (childEvent: string) => {
      this.clickMessage = childEvent;
    },
  };
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

describe('<sc-placeholder /> with input/ouput binding', () => {
  let fixture: ComponentFixture<TestParentComponent>;
  let de: DebugElement;
  let comp: TestParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestParentComponent,
        TestChildComponent,
      ],
      imports: [
        JssModule.withComponents([
          { name: 'Parent', type: TestParentComponent },
          { name: 'Child', type: TestChildComponent },
        ]),
      ],
      providers: [
        { provide: NgModuleFactoryLoader, value: SpyNgModuleFactoryLoader },
      ],
    });

    fixture = TestBed.createComponent(TestParentComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind inputs to children', async(() => {
    const expectedMessage = 'lorem';
    const functionResult = 42;
    const changedMessage = 'ipsum';

    comp.rendering = {
      placeholders: {
        children: [
          {
            componentName: 'Child',
          },
        ],
      },
    };
    comp.name = 'children';
    comp.childMessage = expectedMessage;
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const childComponent = de.query(By.directive(TestChildComponent));
        expect(childComponent.nativeElement.innerHTML).toContain(expectedMessage);
        expect(childComponent.nativeElement.innerHTML).toContain(functionResult);
        comp.childMessage = changedMessage;
        fixture.detectChanges();
        expect(childComponent.nativeElement.innerHTML).toContain(changedMessage);
      });
  }));

  it('should bind inputs to multiple', async(() => {
    const expectedMessage = 'lorem';

    comp.rendering = {
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
    };
    comp.name = 'children';
    comp.childMessage = expectedMessage;
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const childComponents = de.queryAll(By.directive(TestChildComponent));
        expect(childComponents.length).toBe(3);
        childComponents.forEach((childComponent) => {
          expect(childComponent.nativeElement.innerHTML).toContain(expectedMessage);
        });
      });
  }));

  it('should bind outputs to children', async(() => {
    comp.rendering = {
      placeholders: {
        children: [
          {
            componentName: 'Child',
          },
        ],
      },
    };
    comp.name = 'children';
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const button = de.query(By.css('button'));
        button.nativeElement.click();
        fixture.detectChanges();

        expect(de.nativeElement.innerHTML).toContain('dolor');
      });
  }));
});
