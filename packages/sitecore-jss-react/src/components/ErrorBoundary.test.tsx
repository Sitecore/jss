import React, { Suspense } from 'react';
import { expect } from 'chai';
import { render, waitFor } from '@testing-library/react';
import { spy } from 'sinon';
import ErrorBoundary from './ErrorBoundary';
import { SitecoreContextReactContext } from '../components/SitecoreContext';
import { ComponentRendering, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';

describe('ErrorBoundary', () => {
  describe('when in page editing or preview mode', () => {
    it('Should render custom error component when custom error component is provided and error is thrown', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          pageState: LayoutServicePageState.Preview,
        },
        setContext,
      };

      const testComponentName = 'Test component Name';
      const rendering: ComponentRendering = { componentName: testComponentName };

      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const CustomErrorComponent: React.FC = () => {
        return <div>This is a custom error component!</div>;
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering} errorComponent={CustomErrorComponent}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.container.querySelectorAll('div').length).to.equal(1);
      expect(rendered.container.querySelector('div')?.textContent).to.equal(
        'This is a custom error component!'
      );
    });

    it('Should render errors message and errored component name when error is thrown in edit mode', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          pageState: LayoutServicePageState.Edit,
        },
        setContext,
      };

      const testComponentName = 'Test component Name';
      const rendering: ComponentRendering = { componentName: testComponentName };

      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      const ems = rendered.container.querySelectorAll('em');
      expect(rendered.baseElement.innerHTML).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.baseElement.innerHTML).to.contain('A rendering error occurred in component');
      expect(ems.length).to.equal(2);
      expect(ems[0].textContent).to.equal(testComponentName);
      expect(ems[1].textContent).to.equal(errorMessage);
    });

    it('Should render errors message and errored component name when error is thrown in preview mode', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          pageState: LayoutServicePageState.Preview,
        },
        setContext,
      };

      const testComponentName = 'Test component Name';
      const rendering: ComponentRendering = { componentName: testComponentName };

      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );
      const ems = rendered.container.querySelectorAll('em');

      expect(rendered.baseElement.innerHTML).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.baseElement.innerHTML).to.contain('A rendering error occurred in component');
      expect(ems.length).to.equal(2);
      expect(ems[0].textContent).to.equal(testComponentName);
      expect(ems[1].textContent).to.equal(errorMessage);
    });
  });

  describe('when in development mode', () => {
    before(() => {
      process.env.NODE_ENV = 'development';
    });

    after(() => {
      delete process.env.NODE_ENV;
    });

    it('Should render custom error component when custom error component is provided and error is thrown', () => {
      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const CustomErrorComponent: React.FC = () => {
        return <div>This is a custom error component!</div>;
      };

      const rendered = render(
        <ErrorBoundary errorComponent={CustomErrorComponent}>
          <TestErrorComponent />
        </ErrorBoundary>
      );
      expect(rendered.container.querySelectorAll('div').length).to.equal(1);
      expect(rendered.container.querySelector('div')?.textContent).to.equal(
        'This is a custom error component!'
      );
    });

    it('Should render errors message and errored component name when error is thrown and is in page editing mode', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          pageEditing: true,
        },
        setContext,
      };

      const testComponentName = 'Test component Name';
      const rendering: ComponentRendering = { componentName: testComponentName };

      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      const ems = rendered.container.querySelectorAll('em');
      expect(rendered.baseElement.innerHTML).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.baseElement.innerHTML).to.contain('A rendering error occurred in component');
      expect(ems.length).to.equal(2);
      expect(ems[0].textContent).to.equal(testComponentName);
      expect(ems[1].textContent).to.equal(errorMessage);
    });

    it('Should render errors message and errored component name when error is thrown and is not in page editing mode', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          pageEditing: false,
        },
        setContext,
      };

      const testComponentName = 'Test component Name';
      const rendering: ComponentRendering = { componentName: testComponentName };

      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );
      const ems = rendered.container.querySelectorAll('em');

      expect(rendered.baseElement.innerHTML).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.baseElement.innerHTML).to.contain('A rendering error occurred in component');
      expect(ems.length).to.equal(2);
      expect(ems[0].textContent).to.equal(testComponentName);
      expect(ems[1].textContent).to.equal(errorMessage);
    });
  });

  describe('when not in page editing and not in development mode', () => {
    const delay = (timeout, promise?) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      }).then(() => promise);
    };

    const ItsADynamicComponent = React.lazy(() =>
      delay(500, import('../test-data/test-dynamic-component'))
    );

    it('should render a loading message', async () => {
      const rendered = render(
        <ErrorBoundary>
          <ItsADynamicComponent />
        </ErrorBoundary>
      );
      expect(rendered.baseElement.textContent).to.equal('Loading component...');
    });

    it('should render custom loading message', async () => {
      const loading = 'I am customly loading...';
      const rendered = render(
        <ErrorBoundary componentLoadingMessage={loading}>
          <ItsADynamicComponent />
        </ErrorBoundary>
      );
      expect(rendered.baseElement.textContent).to.equal(loading);
    });

    it('should not render Suspense and default loading message when wrapping a dynamic component', async () => {
      // render fails with lazy component and no suspense
      const rendered = render(
        <Suspense>
          <ErrorBoundary isDynamic={true}>
            <ItsADynamicComponent />
          </ErrorBoundary>
        </Suspense>
      );
      expect(rendered.baseElement.textContent).to.equal('');
      await waitFor(() => expect(rendered.getAllByText('No error').length).to.equal(1));
    });

    it('Should render custom error component when custom error component is provided and error is thrown', () => {
      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const CustomErrorComponent: React.FC = () => {
        return <div>This is a custom error component!</div>;
      };

      const rendered = render(
        <ErrorBoundary errorComponent={CustomErrorComponent}>
          <TestErrorComponent />
        </ErrorBoundary>
      );
      expect(rendered.container.querySelectorAll('div').length).to.equal(1);
      expect(rendered.container.querySelector('div')?.textContent).to.equal(
        'This is a custom error component!'
      );
    });

    it('Should render default errors message when error is thrown and custom error component is not provided', () => {
      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = render(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      );

      expect(rendered.baseElement.innerHTML).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.baseElement.innerHTML).to.contain(
        'There was a problem loading this section.' // eslint-disable-line
      );
      expect(rendered.container.querySelectorAll('em').length).to.equal(0);
      expect(rendered.baseElement.innerHTML).to.not.contain(errorMessage);
    });
  });
});
