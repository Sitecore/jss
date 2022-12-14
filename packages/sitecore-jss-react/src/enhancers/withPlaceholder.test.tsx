/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { altData, convertedDevData as nonEeDevData } from '../test-data/non-ee-data';
import { convertedData as eeData } from '../test-data/ee-data';
import { withPlaceholder } from '../enhancers/withPlaceholder';
import { SitecoreContext } from '../components/SitecoreContext';
import { PlaceholderProps } from '../components/PlaceholderCommon';
import PropTypes from 'prop-types';
import { ComponentFactory } from '../components/sharedTypes';
import { ComponentRendering, RouteData } from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from '../components/Placeholder';

type CalloutProps = PlaceholderProps & {
  [prop: string]: unknown;
  fields?: { message?: { value?: string } };
  subProp?: ReactElement;
};

type HomeProps = PlaceholderProps & {
  [prop: string]: unknown;
  rendering?: RouteData | ComponentRendering;
  subProp?: ReactElement;
};

const DownloadCallout: React.FC<CalloutProps> = (props) => (
  <div className="download-callout-mock">
    {props.fields?.message ? props.fields.message.value : ''}
  </div>
);

const Home: React.FC<HomeProps> = ({
  rendering,
  render,
  renderEach,
  renderEmpty,
  name,
  subProp,
  ...otherProps
}) => {
  if (subProp && !otherProps.reset) {
    return <div className="home-mock-with-prop">{subProp}</div>;
  } else {
    return (
      <div className="home-mock">
        <Placeholder name={name} rendering={rendering} {...otherProps} />
      </div>
    );
  }
};

const ErrorComponent: React.FC = () => {
  throw 'Error!';
};

const ErrorMessageComponent: React.FC = () => (
  <div className="error-handled">Your error has been... dealt with.</div>
);

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC>();

  // pass otherProps to page-content to test property cascading through the Placeholder

  Home.propTypes = {
    placeholders: PropTypes.object,
  };

  components.set('Home', Home);

  DownloadCallout.propTypes = {
    fields: PropTypes.shape({
      message: PropTypes.shape({
        value: PropTypes.string,
      }),
    }).isRequired,
  };

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <div className="jumbotron-mock"></div>);

  return components.get(componentName) || null;
};

const testData = [
  { label: 'Dev data', data: nonEeDevData },
  { label: 'LayoutService data - EE on', data: eeData },
];

describe('withPlaceholder HOC', () => {
  describe('Error handling', () => {
    it('should render default error component on wrapped component error', () => {
      const phKey = 'page-content';
      const props: PlaceholderProps = {
        name: phKey,
        rendering: null,
        componentFactory: componentFactory,
      };
      const Element = withPlaceholder(phKey)(ErrorComponent);
      const renderedComponent = mount(<Element {...props} />);
      expect(renderedComponent.find('.sc-jss-placeholder-error').length).to.equal(1);
    });

    it('should render custom component error on wrapped component error, when provided', () => {
      const phKey = 'page-content';
      const props: PlaceholderProps = {
        name: phKey,
        rendering: null,
        componentFactory: componentFactory,
        errorComponent: ErrorMessageComponent,
      };
      const Element = withPlaceholder(phKey)(ErrorComponent);
      const renderedComponent = mount(<Element {...props} />);
      expect(renderedComponent.find('.error-handled').length).to.equal(1);
    });
  });

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', () => {
        const component = (dataSet.data.sitecore.route.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName);
        const phKey = 'page-content';
        const props: PlaceholderProps = {
          name: phKey,
          rendering: component,
          componentFactory: componentFactory,
        };
        const Element = withPlaceholder(phKey)(Home);
        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      });
      it('should render a placeholder with given key and prop', () => {
        const component = (dataSet.data.sitecore.route.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName);
        const phKeyAndProp = {
          placeholder: 'page-header',
          prop: 'subProp',
        };
        const props: PlaceholderProps = {
          name: 'page-header',
          rendering: component,
          componentFactory: componentFactory,
        };
        const Element = withPlaceholder(phKeyAndProp)(Home);
        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.home-mock-with-prop').length).to.not.equal(0);
        expect(renderedComponent.find('.jumbotron-mock').length).to.equal(1);
      });
      it('should use propsTransformer method when provided', () => {
        const component = (dataSet.data.sitecore.route.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName);
        const phKeyAndProp = {
          placeholder: 'page-header',
          prop: 'subProp',
        };
        const phOptions = {
          propsTransformer: (props) => {
            return { ...props, reset: true };
          },
        };
        const props: PlaceholderProps = {
          name: 'page-header',
          rendering: component,
          componentFactory: componentFactory,
        };
        const Element = withPlaceholder(phKeyAndProp, phOptions)(Home);
        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.home-mock-with-prop').length).to.equal(0);
        expect(renderedComponent.find('.home-mock').length).to.not.equal(0);
      });
    });
  });
});
