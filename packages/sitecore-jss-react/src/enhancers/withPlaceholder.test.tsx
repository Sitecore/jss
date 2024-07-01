/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, ReactNode } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { convertedDevData as nonEeDevData } from '../test-data/non-ee-data';
import { convertedData as eeData } from '../test-data/ee-data';
import * as metadataData from '../test-data/metadata-data';
import { withPlaceholder } from '../enhancers/withPlaceholder';
import { SitecoreContext } from '../components/SitecoreContext';
import { PlaceholderProps } from '../components/PlaceholderCommon';
import PropTypes from 'prop-types';
import { ComponentFactory } from '../components/sharedTypes';
import {
  ComponentRendering,
  EditMode,
  LayoutServiceData,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from '../components/Placeholder';
import { EnhancedOmit } from '@sitecore-jss/sitecore-jss/utils';

type CalloutProps = PlaceholderProps & {
  [prop: string]: unknown;
  fields: { message: { value?: string } };
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

DownloadCallout.propTypes = {
  fields: PropTypes.shape({
    message: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Home: React.FC<HomeProps> = ({ rendering, name, subProp, ...otherProps }: HomeProps) => {
  if (subProp && !otherProps.reset) {
    return <div className="home-mock-with-prop">{subProp}</div>;
  } else {
    return <div className="home-mock">{otherProps[name] as ReactNode}</div>;
  }
};

const ErrorComponent: React.FC = () => {
  throw 'Error!';
};

const ErrorMessageComponent: React.FC = () => (
  <div className="error-handled">Your error has been... dealt with.</div>
);

const delay = (timeout, promise?) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  }).then(() => promise);
};

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC<any>>();

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <div className="jumbotron-mock"></div>);
  components.set('BrokenComponent', () => {
    throw new Error('BrokenComponent error');
  });
  components.set(
    'DynamicComponent',
    React.lazy(() =>
      delay(500, () => {
        throw new Error('DynamicComponent error');
      })
    )
  );

  return components.get(componentName) || null;
};

const testData = [
  { label: 'Dev data', data: nonEeDevData },
  { label: 'LayoutService data - EE on', data: eeData },
];

describe('withPlaceholder HOC', () => {
  describe('Error handling', () => {
    before(() => {
      // Set to development mode to show error details
      process.env.NODE_ENV = 'development';
    });

    it('should render default error component on wrapped component error', () => {
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: (null as unknown) as ComponentRendering,
      };
      const Element = withPlaceholder(phKey)(ErrorComponent);
      const renderedComponent = mount(
        <SitecoreContext
          layoutData={(nonEeDevData as unknown) as LayoutServiceData}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );
      expect(renderedComponent.find('.sc-jss-placeholder-error').length).to.equal(1);
    });

    it('should render custom component error on wrapped component error, when provided', () => {
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: (null as unknown) as ComponentRendering,
        errorComponent: ErrorMessageComponent,
      };
      const Element = withPlaceholder(phKey)(ErrorComponent);
      const renderedComponent = mount(
        <SitecoreContext
          layoutData={(nonEeDevData as unknown) as LayoutServiceData}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );
      expect(renderedComponent.find('.error-handled').length).to.equal(1);
    });

    it('should render nested broken component', () => {
      const component = (nonEeDevData.sitecore.route?.placeholders.main as (
        | ComponentRendering
        | RouteData
      )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={nonEeDevData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      expect(renderedComponent.find('.sc-jss-placeholder-error').length).to.equal(1);
      expect(renderedComponent.find('h4').length).to.equal(1);
      expect(renderedComponent.find('h4').html()).to.equal('<h4>Loading component...</h4>');
    });

    it('should render nested components using custom error component', () => {
      const component = (nonEeDevData.sitecore.route?.placeholders.main as (
        | ComponentRendering
        | RouteData
      )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
        errorComponent: ErrorMessageComponent,
        componentLoadingMessage: 'Custom loading message...',
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={nonEeDevData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      expect(renderedComponent.find('.error-handled').length).to.equal(1);
      expect(renderedComponent.find('h4').length).to.equal(1);
      expect(renderedComponent.find('h4').html()).to.equal('<h4>Custom loading message...</h4>');
    });

    describe('Edit mode', () => {
      const component = (eeData.sitecore.route?.placeholders.main as (
        | ComponentRendering
        | RouteData
      )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext
          layoutData={eeData as LayoutServiceData}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );

      it('should render normal component', () => {
        expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      });

      it('should render nested broken component', () => {
        expect(renderedComponent.find('.sc-jss-placeholder-error').length).to.equal(1);
      });

      it('should render nested dynamic broken component', () => {
        expect(renderedComponent.find('h4').length).to.equal(1);
        expect(renderedComponent.find('h4').html()).to.equal('<h4>Loading component...</h4>');
      });
    });
  });

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', () => {
        const component = (dataSet.data.sitecore.route?.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
        const phKey = 'page-content';
        const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
          name: phKey,
          rendering: component,
        };
        const Element = withPlaceholder(phKey)(Home);
        const renderedComponent = mount(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      });

      it('should render a placeholder with given key and prop', () => {
        const component = (dataSet.data.sitecore.route?.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
        const phKeyAndProp = {
          placeholder: 'page-header',
          prop: 'subProp',
        };
        const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
          name: 'page-header',
          rendering: component,
        };
        const Element = withPlaceholder(phKeyAndProp)(Home);
        const renderedComponent = mount(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.home-mock-with-prop').length).to.not.equal(0);
        expect(renderedComponent.find('.jumbotron-mock').length).to.equal(1);
      });

      it('should use propsTransformer method when provided', () => {
        const component = (dataSet.data.sitecore.route?.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
        const phKeyAndProp = {
          placeholder: 'page-header',
          prop: 'subProp',
        };
        const phOptions = {
          propsTransformer: (props) => {
            return { ...props, reset: true };
          },
        };
        const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
          name: 'page-header',
          rendering: component,
        };
        const Element = withPlaceholder(phKeyAndProp, phOptions)(Home);
        const renderedComponent = mount(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );
        expect(renderedComponent.find('.home-mock-with-prop').length).to.equal(0);
        expect(renderedComponent.find('.home-mock').length).to.not.equal(0);
      });
    });
  });

  describe('Metadata Mode', () => {
    const {
      layoutData,
      layoutDataWithEmptyPlaceholder,
      layoutDataForNestedDynamicPlaceholder,
      layoutDataWithUnknownComponent,
    } = metadataData;

    const componentFactory: ComponentFactory = (componentName: string) => {
      const components = new Map<string, React.FC>();

      components.set('Header', () => (
        <div className="header-wrapper">
          <Placeholder
            name="logo"
            rendering={metadataData.layoutData.sitecore.route.placeholders.main[0]}
          />
        </div>
      ));
      components.set('Logo', () => <div className="Logo-mock" />);

      return components.get(componentName) || null;
    };

    it('should render a placeholder with given key', () => {
      const component = layoutData.sitecore.route;
      const phKey = 'main';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={layoutData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );
      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
          '<div class="header-wrapper">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
          '<div class="Logo-mock"></div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });

    it('should render a placeholder with given key and prop', () => {
      const component = layoutData.sitecore.route;
      const phKey = 'main';
      const phKeyAndProp = {
        placeholder: phKey,
        prop: 'subProp',
      };
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKeyAndProp)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={layoutData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock-with-prop">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
          '<div class="header-wrapper">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
          '<div class="Logo-mock"></div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });

    it('should render code blocks even if placeholder is empty', () => {
      const component = layoutDataWithEmptyPlaceholder.sitecore.route;
      const phKey = 'main';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext
          layoutData={layoutDataWithEmptyPlaceholder}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });

    it('should render missing component with code blocks if component is not registered', () => {
      const component = layoutDataWithUnknownComponent.sitecore.route;
      const phKey = 'main';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext
          layoutData={layoutDataWithUnknownComponent}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
          '<div style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;"><h2>Unknown</h2><p>JSS component is missing React implementation. See the developer console for more information.</p></div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });

    it('should render dynamic placeholder', () => {
      const phKey = 'container-1';
      const layoutData = layoutDataForNestedDynamicPlaceholder('container-{*}');
      const component = layoutData.sitecore.route;
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={layoutData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="container-{*}_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
          '<div class="header-wrapper">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
          '<div class="Logo-mock"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });

    it('should render double digit dynamic placeholder', () => {
      const phKey = 'container-1-2';
      const layoutData = layoutDataForNestedDynamicPlaceholder('container-1-{*}');
      const component = layoutData.sitecore.route;
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = mount(
        <SitecoreContext layoutData={layoutData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      expect(renderedComponent.html()).to.equal(
        [
          '<div class="home-mock">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="container-1-{*}_00000000-0000-0000-0000-000000000000"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
          '<div class="header-wrapper">',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
          '<div class="Logo-mock"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
          '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
          '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
          '</div>',
        ].join('')
      );
    });
  });
});
