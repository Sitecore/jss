/* eslint-disable quotes */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { FormComponent, FormRendering } from './form.component';
import { EDGE_CONFIG, EdgeConfigToken } from '../services/shared.token';
import { JssStateService } from '../services/jss-state.service';
import { cleanHtml } from '../test-utils';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockElementRef: ElementRef<HTMLElement>;

  let elementRef: ElementRef<HTMLElement>;

  const mockRendering: FormRendering = {
    params: {
      FormId: 'test-form-id',
    },
    componentName: 'test-component',
    dataSource: 'test-data-source',
    placeholders: {},
    uid: 'test-uid',
  };

  const mockEdgeConfig: EdgeConfigToken = {
    sitecoreEdgeContextId: 'test-context-id',
    sitecoreEdgeUrl: 'http://test-url.com',
  };

  const init = ({
    rendering = mockRendering,
    edgeConfig = mockEdgeConfig,
  }: {
    rendering?: FormRendering;
    edgeConfig?: EdgeConfigToken;
  } = {}) => {
    mockElementRef = {
      nativeElement: document.createElement('div'),
    };

    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        JssStateService,
        { provide: EDGE_CONFIG, useValue: edgeConfig },
        { provide: ElementRef, useValue: mockElementRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.rendering = rendering;
    elementRef = fixture.debugElement.injector.get(ElementRef);
  };

  it('should load form', fakeAsync(() => {
    init();

    spyOn(component, 'loadForm').and.callThrough();

    // Mock request to Forms API
    const mockResponse = {
      text: () =>
        Promise.resolve(
          '<div>Form Content</div>\n' +
            '<script type="javascript">console.log(\'script 1\');</script>\n' +
            '<script type="javascript">console.log(\'script 2\');</script>'
        ),
      status: 200,
    };
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse as Response));
    spyOn(component, 'executeScriptElements').and.callThrough();

    const createElementSpy = spyOn(document, 'createElement').and.callThrough();
    const replaceChildSpy = spyOn(elementRef.nativeElement, 'replaceChild').and.callThrough();

    fixture.detectChanges();

    tick();

    expect(component.loadForm).toHaveBeenCalled();

    expect(window.fetch).toHaveBeenCalledWith(
      'http://test-url.com/v1/forms/publisher/test-form-id?sitecoreContextId=test-context-id',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );

    expect(elementRef.nativeElement.innerHTML).toBe(
      '<div>Form Content</div>\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script>'
    );
    expect(component.executeScriptElements).toHaveBeenCalled();

    expect(createElementSpy).toHaveBeenCalledTimes(2);
    expect(createElementSpy.calls.allArgs()).toEqual([['script'], ['script']]);

    expect(replaceChildSpy).toHaveBeenCalledTimes(2);

    const scriptElements = elementRef.nativeElement.querySelectorAll('script');

    expect(scriptElements.length).toBe(2);
    expect(scriptElements[0].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 1\');</script>'
    );
    expect(scriptElements[1].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 2\');</script>'
    );
  }));

  it('should load form with no sitecoreEdgeUrl', fakeAsync(() => {
    init({
      edgeConfig: {
        sitecoreEdgeContextId: 'test-context-id',
      },
    });

    spyOn(component, 'loadForm').and.callThrough();

    const mockResponse = {
      text: () =>
        Promise.resolve(
          '<div>Form Content</div>\n' +
            '<script type="javascript">console.log(\'script 1\');</script>\n' +
            '<script type="javascript">console.log(\'script 2\');</script>'
        ),
      status: 200,
    };
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse as Response));
    spyOn(component, 'executeScriptElements').and.callThrough();

    const createElementSpy = spyOn(document, 'createElement').and.callThrough();
    const replaceChildSpy = spyOn(elementRef.nativeElement, 'replaceChild').and.callThrough();

    fixture.detectChanges();

    tick();

    expect(component.loadForm).toHaveBeenCalled();

    expect(window.fetch).toHaveBeenCalledWith(
      'https://edge-platform.sitecorecloud.io/v1/forms/publisher/test-form-id?sitecoreContextId=test-context-id',
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    expect(elementRef.nativeElement.innerHTML).toBe(
      '<div>Form Content</div>\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script>'
    );
    expect(component.executeScriptElements).toHaveBeenCalled();

    expect(createElementSpy).toHaveBeenCalledTimes(2);
    expect(createElementSpy.calls.allArgs()).toEqual([['script'], ['script']]);

    expect(replaceChildSpy).toHaveBeenCalledTimes(2);

    const scriptElements = elementRef.nativeElement.querySelectorAll('script');

    expect(scriptElements.length).toBe(2);
    expect(scriptElements[0].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 1\');</script>'
    );
    expect(scriptElements[1].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 2\');</script>'
    );
  }));

  describe('when FormId is not provided', () => {
    it('editing mode - should log warning and render error', fakeAsync(() => {
      const mockRendering = {
        params: {
          FormId: '',
        },
        componentName: 'test-component',
        dataSource: 'test-data-source',
        placeholders: {},
        uid: 'test-uid',
      };

      init({
        rendering: mockRendering,
      });

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Edit,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form was not able to render since FormId is not provided in the rendering data`,
        JSON.stringify(mockRendering, null, 2)
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        `<div style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;">` +
          `<h2>test-component</h2>` +
          `<p>JSS component is missing FormId rendering parameter.</p>` +
          `</div>`
      );
    }));

    it('preview mode - should log warning and render error', fakeAsync(() => {
      const mockRendering = {
        params: {
          FormId: '',
        },
        componentName: 'test-component',
        dataSource: 'test-data-source',
        placeholders: {},
        uid: 'test-uid',
      };

      init({
        rendering: mockRendering,
      });

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Preview,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form was not able to render since FormId is not provided in the rendering data`,
        JSON.stringify(mockRendering, null, 2)
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        `<div style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;">` +
          `<h2>test-component</h2>` +
          `<p>JSS component is missing FormId rendering parameter.</p>` +
          `</div>`
      );
    }));

    it('normal mode - should log warning', fakeAsync(() => {
      const mockRendering = {
        params: {
          FormId: '',
        },
        componentName: 'test-component',
        dataSource: 'test-data-source',
        placeholders: {},
        uid: 'test-uid',
      };

      init({
        rendering: mockRendering,
      });

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Normal,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form was not able to render since FormId is not provided in the rendering data`,
        JSON.stringify(mockRendering, null, 2)
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual('');
    }));
  });

  describe('when fetch fails', () => {
    it('editing mode - should log warning and render error', fakeAsync(() => {
      init();

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Edit,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      spyOn(window, 'fetch').and.throwError('Fetch failed');

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form 'test-form-id' was not able to render with the current rendering data`,
        JSON.stringify(mockRendering, null, 2),
        new Error('Fetch failed')
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        `<div class="sc-jss-placeholder-error">There was a problem loading this section</div>`
      );
    }));

    it('preview mode - should log warning and render error', fakeAsync(() => {
      init();

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Preview,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      spyOn(window, 'fetch').and.throwError('Fetch failed');

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form 'test-form-id' was not able to render with the current rendering data`,
        JSON.stringify(mockRendering, null, 2),
        new Error('Fetch failed')
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        `<div class="sc-jss-placeholder-error">There was a problem loading this section</div>`
      );
    }));

    it('should log warning and render error when fetch returns non-200 status', fakeAsync(() => {
      init();

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Edit,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      const mockResponse = {
        text: () => Promise.resolve('Some error message'),
        status: 500,
      };

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse as Response));

      fixture.detectChanges();

      tick();

      fixture.detectChanges();

      expect(console.warn).toHaveBeenCalledWith(
        `Form 'test-form-id' was not able to render with the current rendering data`,
        JSON.stringify(mockRendering, null, 2),
        'Some error message'
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        `<div class="sc-jss-placeholder-error">There was a problem loading this section</div>`
      );
    }));

    it('normal mode - should log warning', fakeAsync(() => {
      init();

      const stateService = TestBed.inject(JssStateService);

      stateService.setState({
        sitecore: {
          context: {
            pageState: LayoutServicePageState.Normal,
          },
          route: null,
        },
      });

      spyOn(console, 'warn').and.callThrough();

      spyOn(window, 'fetch').and.throwError('Fetch failed');

      fixture.detectChanges();

      tick();

      expect(console.warn).toHaveBeenCalledWith(
        `Form 'test-form-id' was not able to render with the current rendering data`,
        JSON.stringify(mockRendering, null, 2),
        new Error('Fetch failed')
      );

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual('');
    }));
  });
});
