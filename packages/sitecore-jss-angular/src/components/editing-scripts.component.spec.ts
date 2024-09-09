import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { PAGES_EDITING_MARKER } from '@sitecore-jss/sitecore-jss/editing';
import { inject } from '@angular/core/testing';
import { JssStateService } from '../services/jss-state.service';
import { EditingScriptsComponent } from './editing-scripts.component';

@Component({
  selector: 'test-component',
  template: `
    <sc-editing-scripts></sc-editing-scripts>
  `,
})
class TestComponent {}

describe('<EditingScripts />', () => {
  let fixture: ComponentFixture<TestComponent>;

  const sharedData = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EditingScriptsComponent],
      providers: [
        Renderer2,
        JssStateService,
        { provide: DOCUMENT, useValue: document.implementation.createHTMLDocument() },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should not add editing scripts and client data when edit mode is Chromes', inject(
    [JssStateService, DOCUMENT],
    (stateService: JssStateService, _document: Document) => {
      stateService.setState({
        sitecore: {
          context: {
            editMode: EditMode.Chromes,
            pageState: LayoutServicePageState.Edit,
            ...sharedData,
          },
          route: null,
        },
      });

      fixture.detectChanges();

      expect(_document.body.querySelector(`#${PAGES_EDITING_MARKER}`)).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-state')).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-verification-token')).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/packages/page-extension/latest/page.js"]'
        )
      ).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/horizon/canvas/horizon.canvas.js"]'
        )
      ).toBeNull();
    }
  ));

  it('should not add editing scripts and client data when page state is Normal', inject(
    [JssStateService, DOCUMENT],
    (stateService: JssStateService, _document: Document) => {
      stateService.setState({
        sitecore: {
          context: {
            editMode: EditMode.Metadata,
            pageState: LayoutServicePageState.Normal,
            ...sharedData,
          },
          route: null,
        },
      });

      fixture.detectChanges();

      expect(_document.body.querySelector(`#${PAGES_EDITING_MARKER}`)).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-state')).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-verification-token')).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/packages/page-extension/latest/page.js"]'
        )
      ).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/horizon/canvas/horizon.canvas.js"]'
        )
      ).toBeNull();
    }
  ));

  it('should add editing scripts and client data when edit mode is Metadata', inject(
    [JssStateService, DOCUMENT],
    (stateService: JssStateService, _document: Document) => {
      stateService.setState({
        sitecore: {
          context: {
            editMode: EditMode.Metadata,
            pageState: LayoutServicePageState.Edit,
            ...sharedData,
          },
          route: null,
        },
      });

      fixture.detectChanges();

      expect(_document.body.querySelector(`#${PAGES_EDITING_MARKER}`)).toBeDefined();
      expect(_document.body.querySelector('#hrz-canvas-state')?.innerHTML).toEqual(
        '{"itemId":"1329a009-1b93-4855-8855-894bc40d7135","siteName":"jss","language":"en"}'
      );
      expect(_document.body.querySelector('#hrz-canvas-verification-token')?.innerHTML).toEqual(
        '{"token":"test"}'
      );
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/packages/page-extension/latest/page.js"]'
        )
      ).toBeTruthy();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/horizon/canvas/horizon.canvas.js"]'
        )
      ).toBeTruthy();
    }
  ));

  it('should not add editing scripts and client data when page state is preview', inject(
    [JssStateService, DOCUMENT],
    (stateService: JssStateService, _document: Document) => {
      stateService.setState({
        sitecore: {
          context: {
            editMode: EditMode.Metadata,
            pageState: LayoutServicePageState.Preview,
            ...sharedData,
          },
          route: null,
        },
      });

      fixture.detectChanges();

      expect(_document.body.querySelector(`#${PAGES_EDITING_MARKER}`)).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-state')).toBeNull();
      expect(_document.body.querySelector('#hrz-canvas-verification-token')).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/packages/page-extension/latest/page.js"]'
        )
      ).toBeNull();
      expect(
        _document.body.querySelector(
          'script[src="https://test.com/horizon/canvas/horizon.canvas.js"]'
        )
      ).toBeNull();
    }
  ));
});
