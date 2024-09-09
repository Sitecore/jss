/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
// import { EditingScriptsDirective } from './editing-scripts.directive';
import { JssStateService } from '../services/jss-state.service';
import { EditingScriptsDirective } from './editing-scripts.directive';
// import { JssModule } from '../public_api';
// import { By } from '@angular/platform-browser';
// import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <div *scEditingScripts></div>
  `,
})
class TestComponent {}

// const JSS_STATE_SERVICE = new InjectionToken('JssStateService');

fdescribe('EditingScriptsDirective', () => {
  // let renderer: Renderer2;
  let stateService: JssStateService;
  let document: Document;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [EditingScriptsDirective],
  //     providers: [Renderer2, JssStateService, { provide: DOCUMENT, useValue: document }],
  //   });

  //   fixture = TestBed.createComponent(EditingScriptsDirective);
  //   directive = fixture.componentInstance;
  //   renderer = TestBed.inject(Renderer2);
  //   stateService = TestBed.inject(JssStateService);
  //   document = TestBed.inject(DOCUMENT);
  // });

  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  // let comp: TestComponent;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent, EditingScriptsDirective],
        providers: [Renderer2, JssStateService],
      }).compileComponents();
      document = TestBed.inject(DOCUMENT);
      fixture = TestBed.createComponent(TestComponent);
      de = fixture.debugElement;
      stateService = de.injector.get(JssStateService);
      // fixture.detectChanges();
      // comp = fixture.componentInstance;
      // fixture.detectChanges();

      // de = fixture.debugElement.query(By.css('div'));

      // de = fixture.debugElement.query(By.css('div'));
    })
  );

  it(
    'should add editing scripts and client data in edit mode Metadata',
    waitForAsync(async () => {
      stateService.setState({
        sitecore: {
          context: {
            editMode: EditMode.Metadata,
            pageState: LayoutServicePageState.Edit,
            clientScripts: [
              'https://test.com/packages/page-extension/latest/page.js',
              'https://test.com/horizon/canvas/horizon.canvas.js',
            ],
            clientData: {
              'hrz-canvas-state': {
                itemId: '1329a009-1b93-4855-8855-894bc40d7135',
                siteName: 'jss',
                language: 'en',
              },
              'hrz-canvas-verification-token': {
                token: 'test',
              },
            },
          },
          route: null,
        },
      });

      fixture.detectChanges();
      await fixture.whenStable();

      document = TestBed.inject(DOCUMENT);
      console.log(document.body.innerHTML);

      expect(document.body.querySelector('script')).toBeFalse();
      // expect(de.nativeElement.innerHTML).toBe('');
    })
  );
});
