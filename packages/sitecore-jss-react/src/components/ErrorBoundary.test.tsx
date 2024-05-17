import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
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

      const rendered = mount(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering} customErrorComponent={CustomErrorComponent}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.find('div').length).to.equal(1);
      expect(rendered.find('div').text()).to.equal('This is a custom error component!');
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

      const rendered = mount(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.html()).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.html()).to.contain('A rendering error occurred in component');
      expect(rendered.find('em').length).to.equal(2);
      expect(
        rendered
          .find('em')
          .at(0)
          .text()
      ).to.equal(testComponentName);
      expect(
        rendered
          .find('em')
          .at(1)
          .text()
      ).to.equal(errorMessage);
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

      const rendered = mount(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.html()).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.html()).to.contain('A rendering error occurred in component');
      expect(rendered.find('em').length).to.equal(2);
      expect(
        rendered
          .find('em')
          .at(0)
          .text()
      ).to.equal(testComponentName);
      expect(
        rendered
          .find('em')
          .at(1)
          .text()
      ).to.equal(errorMessage);
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

      const rendered = mount(
        <ErrorBoundary customErrorComponent={CustomErrorComponent}>
          <TestErrorComponent />
        </ErrorBoundary>
      );
      expect(rendered.find('div').length).to.equal(1);
      expect(rendered.find('div').text()).to.equal('This is a custom error component!');
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

      const rendered = mount(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.html()).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.html()).to.contain('A rendering error occurred in component');
      expect(rendered.find('em').length).to.equal(2);
      expect(
        rendered
          .find('em')
          .at(0)
          .text()
      ).to.equal(testComponentName);
      expect(
        rendered
          .find('em')
          .at(1)
          .text()
      ).to.equal(errorMessage);
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

      const rendered = mount(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <ErrorBoundary rendering={rendering}>
            <TestErrorComponent />
          </ErrorBoundary>
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.html()).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.html()).to.contain('A rendering error occurred in component');
      expect(rendered.find('em').length).to.equal(2);
      expect(
        rendered
          .find('em')
          .at(0)
          .text()
      ).to.equal(testComponentName);
      expect(
        rendered
          .find('em')
          .at(1)
          .text()
      ).to.equal(errorMessage);
    });
  });
  describe('when not in page editing and not in development mode', () => {
    it('Should render custom error component when custom error component is provided and error is thrown', () => {
      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const CustomErrorComponent: React.FC = () => {
        return <div>This is a custom error component!</div>;
      };

      const rendered = mount(
        <ErrorBoundary customErrorComponent={CustomErrorComponent}>
          <TestErrorComponent />
        </ErrorBoundary>
      );
      expect(rendered.find('div').length).to.equal(1);
      expect(rendered.find('div').text()).to.equal('This is a custom error component!');
    });

    it('Should render default errors message when error is thrown and custom error component is not provided', () => {
      const errorMessage = 'an error occured';
      const TestErrorComponent: React.FC = () => {
        throw Error(errorMessage);
      };

      const rendered = mount(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      );

      expect(rendered.html()).to.contain('class="sc-jss-placeholder-error"');
      expect(rendered.html()).to.contain(
        'There was a problem loading this section.' // eslint-disable-line
      );
      expect(rendered.find('em').length).to.equal(0);
      expect(rendered.html()).to.not.contain(errorMessage);
    });
  });
});
