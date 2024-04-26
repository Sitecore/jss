import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import ErrorBoundary from './ErrorBoundary';
import { SitecoreContextReactContext } from '../components/SitecoreContext';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

describe('ErrorBoundary', () => {
  it('Should render provided component when no error is thrown', () => {
    const Foo = () => <h2>foo</h2>;

    const rendered = mount(
      <ErrorBoundary>
        <Foo />
      </ErrorBoundary>
    );

    const hElement = rendered.find('h2');

    expect(hElement.length).to.equal(1);
    expect(hElement.text()).to.equal('foo');
  });

  describe('when in page editing mode', () => {
    it('Should render errors message and errored component name when error is thrown', () => {
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
  });
  describe('when not in page editing mode', () => {
    it('Should render errors message when error is thrown', () => {
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
      expect(rendered.html()).to.contain('A rendering error occurred in component');
      expect(rendered.find('em').length).to.equal(1);
      expect(rendered.find('em').text()).to.equal(errorMessage);
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
  });
});
