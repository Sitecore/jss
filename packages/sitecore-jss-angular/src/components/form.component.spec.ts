import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { FormComponent, FormRendering, mockFormModule } from './form.component';
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
      imports: [FormComponent],
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
    const loadFormSpy = jasmine
      .createSpy('loadForm')
      .and.returnValue(
        Promise.resolve(
          '<form id="test-form">\n' +
            '<script type="javascript">console.log(\'script 1\');</script>\n' +
            '<script type="javascript">console.log(\'script 2\');</script></form>'
        )
      );

    const executeScriptElementsSpy = jasmine.createSpy('executeScriptElements');
    const subscribeToFormSubmitEventSpy = jasmine.createSpy('subscribeToFormSubmitEvent');

    mockFormModule({
      loadForm: loadFormSpy,
      executeScriptElements: executeScriptElementsSpy,
      subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
    });

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

    fixture.detectChanges();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      '<form id="test-form">\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script></form>'
    );

    expect(loadFormSpy).toHaveBeenCalled();
    expect(executeScriptElementsSpy).toHaveBeenCalled();
    expect(subscribeToFormSubmitEventSpy).toHaveBeenCalled();

    const formElement = elementRef.nativeElement.querySelector('form');

    expect(formElement).not.toBeNull();

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
    const loadFormSpy = jasmine
      .createSpy()
      .and.returnValue(
        Promise.resolve(
          '<form id="test-form">\n' +
            '<script type="javascript">console.log(\'script 1\');</script>\n' +
            '<script type="javascript">console.log(\'script 2\');</script></form>'
        )
      );

    const executeScriptElementsSpy = jasmine.createSpy('executeScriptElements');
    const subscribeToFormSubmitEventSpy = jasmine.createSpy('subscribeToFormSubmitEvent');

    mockFormModule({
      loadForm: loadFormSpy,
      executeScriptElements: executeScriptElementsSpy,
      subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
    });

    init({
      edgeConfig: {
        sitecoreEdgeContextId: 'test-context-id',
      },
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

    fixture.detectChanges();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      '<form id="test-form">\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script></form>'
    );
    expect(loadFormSpy).toHaveBeenCalled();
    expect(executeScriptElementsSpy).toHaveBeenCalled();
    expect(subscribeToFormSubmitEventSpy).toHaveBeenCalled();

    const scriptElements = elementRef.nativeElement.querySelectorAll('script');

    expect(scriptElements.length).toBe(2);
    expect(scriptElements[0].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 1\');</script>'
    );
    expect(scriptElements[1].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 2\');</script>'
    );
  }));

  it('should not subscribe on form event if the component is in editing or preview mode', fakeAsync(() => {
    const loadFormSpy = jasmine
      .createSpy()
      .and.returnValue(
        Promise.resolve(
          '<form id="test-form">\n' +
            '<script type="javascript">console.log(\'script 1\');</script>\n' +
            '<script type="javascript">console.log(\'script 2\');</script></form>'
        )
      );

    const executeScriptElementsSpy = jasmine.createSpy('executeScriptElements');
    const subscribeToFormSubmitEventSpy = jasmine.createSpy('subscribeToFormSubmitEvent');

    mockFormModule({
      loadForm: loadFormSpy,
      executeScriptElements: executeScriptElementsSpy,
      subscribeToFormSubmitEvent: subscribeToFormSubmitEventSpy,
    });

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

    fixture.detectChanges();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      '<form id="test-form">\n' +
        '<script type="javascript">console.log(\'script 1\');</script>\n' +
        '<script type="javascript">console.log(\'script 2\');</script></form>'
    );

    expect(loadFormSpy).toHaveBeenCalled();
    expect(executeScriptElementsSpy).toHaveBeenCalled();
    expect(subscribeToFormSubmitEventSpy).not.toHaveBeenCalled();

    const formElement = elementRef.nativeElement.querySelector('form');

    expect(formElement).not.toBeNull();

    const scriptElements = elementRef.nativeElement.querySelectorAll('script');

    expect(scriptElements.length).toBe(2);
    expect(scriptElements[0].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 1\');</script>'
    );
    expect(scriptElements[1].outerHTML).toBe(
      '<script type="javascript">console.log(\'script 2\');</script>'
    );
  }));

  describe('when fetch fails', () => {
    it('editing mode - should render error', fakeAsync(() => {
      const loadFormSpy = jasmine.createSpy().and.throwError('Fetch failed');

      mockFormModule({
        loadForm: loadFormSpy,
      });

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

      fixture.detectChanges();

      tick();

      expect(loadFormSpy).toHaveBeenCalled();

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        '<div class="sc-jss-placeholder-error">There was a problem loading this section</div>'
      );
    }));

    it('preview mode - render error', fakeAsync(() => {
      const loadFormSpy = jasmine.createSpy().and.throwError('Fetch failed');

      mockFormModule({
        loadForm: loadFormSpy,
      });

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

      fixture.detectChanges();

      tick();

      expect(loadFormSpy).toHaveBeenCalled();

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual(
        '<div class="sc-jss-placeholder-error">There was a problem loading this section</div>'
      );
    }));

    it('normal mode - should render nothing', fakeAsync(() => {
      const loadFormSpy = jasmine.createSpy().and.throwError('Fetch failed');

      mockFormModule({
        loadForm: loadFormSpy,
      });

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

      fixture.detectChanges();

      tick();

      expect(loadFormSpy).toHaveBeenCalled();

      expect(cleanHtml(elementRef.nativeElement.innerHTML)).toEqual('');
    }));
  });
});
