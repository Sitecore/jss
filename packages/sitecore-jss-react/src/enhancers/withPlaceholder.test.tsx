import React, { ReactElement, ReactNode } from 'react';
import { expect } from 'chai';
import { render, waitFor } from '@testing-library/react';
import { convertedDevData as nonEeDevData } from '../test-data/non-ee-data';
import { convertedData as eeData } from '../test-data/ee-data';
import { withPlaceholder } from '../enhancers/withPlaceholder';
import { SitecoreContext } from '../components/SitecoreContext';
import { PlaceholderProps } from '../components/PlaceholderCommon';
import { ComponentFactory } from '../components/sharedTypes';
import {
  ComponentRendering,
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

const getEeDataWithoutDynamicComponent = (): LayoutServiceData => {
  const cloned = JSON.parse(JSON.stringify(eeData)) as LayoutServiceData;
  const mainPlaceholders = cloned.sitecore.route?.placeholders?.main;

  if (!Array.isArray(mainPlaceholders)) {
    return cloned;
  }

  mainPlaceholders.forEach((rendering) => {
    const placeholders = (rendering as ComponentRendering).placeholders;
    if (placeholders?.['page-content']) {
      placeholders['page-content'] = placeholders['page-content'].filter(
        (child) => (child as ComponentRendering).componentName !== 'DynamicComponent'
      );
    }
  });

  return cloned;
};

const eeDataWithoutDynamicComponent = getEeDataWithoutDynamicComponent();

const testData = [
  { label: 'Dev data', data: nonEeDevData },
  { label: 'LayoutService data - EE on', data: eeDataWithoutDynamicComponent },
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
      const renderedComponent = render(
        <SitecoreContext
          layoutData={(nonEeDevData as unknown) as LayoutServiceData}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );
      expect(
        renderedComponent.container.querySelectorAll('.sc-jss-placeholder-error').length
      ).to.equal(1);
    });

    it('should render custom component error on wrapped component error, when provided', () => {
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: (null as unknown) as ComponentRendering,
        errorComponent: ErrorMessageComponent,
      };
      const Element = withPlaceholder(phKey)(ErrorComponent);
      const renderedComponent = render(
        <SitecoreContext
          layoutData={(nonEeDevData as unknown) as LayoutServiceData}
          componentFactory={componentFactory}
        >
          <Element {...props} />
        </SitecoreContext>
      );
      expect(renderedComponent.container.querySelectorAll('.error-handled').length).to.equal(1);
    });

    it('should render nested broken component', async () => {
      const component = (nonEeDevData.sitecore.route?.placeholders.main as (
        | ComponentRendering
        | RouteData
      )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
      const phKey = 'page-content';
      const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
        name: phKey,
        rendering: component,
        disableSuspense: false,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = render(
        <SitecoreContext layoutData={nonEeDevData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      await waitFor(() => {
        expect(
          renderedComponent.container.querySelectorAll('.download-callout-mock').length
        ).to.equal(1);
      });
      expect(
        renderedComponent.container.querySelectorAll('.sc-jss-placeholder-error').length
      ).to.equal(1);
      expect(renderedComponent.container.querySelectorAll('h4').length).to.equal(1);
      expect(renderedComponent.container.querySelector('h4')?.outerHTML).to.equal(
        '<h4>Loading component...</h4>'
      );
    });

    it('should render nested components using custom error component', async () => {
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
        disableSuspense: false,
      };
      const Element = withPlaceholder(phKey)(Home);
      const renderedComponent = render(
        <SitecoreContext layoutData={nonEeDevData} componentFactory={componentFactory}>
          <Element {...props} />
        </SitecoreContext>
      );

      await waitFor(() => {
        expect(
          renderedComponent.container.querySelectorAll('.download-callout-mock').length
        ).to.equal(1);
      });
      expect(renderedComponent.container.querySelectorAll('.error-handled').length).to.equal(1);
      expect(renderedComponent.container.querySelectorAll('h4').length).to.equal(1);
      expect(renderedComponent.container.querySelector('h4')?.outerHTML).to.equal(
        '<h4>Custom loading message...</h4>'
      );
    });

    describe('Edit mode', () => {
      const editModeLayoutData = eeDataWithoutDynamicComponent;
      let renderedContainer: HTMLElement;

      before(() => {
        const component = (editModeLayoutData.sitecore.route?.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
        const phKey = 'page-content';
        const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
          name: phKey,
          rendering: component,
          disableSuspense: false,
        };
        const Element = withPlaceholder(phKey)(Home);
        const renderedComponent = render(
          <SitecoreContext
            layoutData={editModeLayoutData as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );

        renderedContainer = renderedComponent.container;
      });

      it('should render normal component', () => {
        expect(renderedContainer.querySelectorAll('.download-callout-mock').length).to.equal(1);
      });

      xit('should render nested broken component', () => {
        expect(renderedContainer.querySelectorAll('.sc-jss-placeholder-error').length).to.equal(1);
      });

      xit('should render nested dynamic broken component', () => {
        expect(renderedContainer.querySelectorAll('h4').length).to.equal(1);
        expect(renderedContainer.querySelector('h4')?.innerHTML).to.equal(
          '<h4>Loading component...</h4>'
        );
      });
    });
  });

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', async () => {
        const component = (dataSet.data.sitecore.route?.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName) as ComponentRendering;
        const phKey = 'page-content';
        const props: EnhancedOmit<PlaceholderProps, 'sitecoreContext'> = {
          name: phKey,
          rendering: component,
          disableSuspense: false,
        };

        const Element = withPlaceholder(phKey)(Home);
        const renderedComponent = render(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );

        await waitFor(() => {
          expect(
            renderedComponent.container.querySelectorAll('.download-callout-mock').length
          ).to.equal(1);
        });
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
        const renderedComponent = render(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );
        expect(
          renderedComponent.container.querySelectorAll('.home-mock-with-prop').length
        ).to.not.equal(0);
        expect(renderedComponent.container.querySelectorAll('.jumbotron-mock').length).to.equal(1);
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
        const renderedComponent = render(
          <SitecoreContext
            layoutData={dataSet.data as LayoutServiceData}
            componentFactory={componentFactory}
          >
            <Element {...props} />
          </SitecoreContext>
        );
        expect(
          renderedComponent.container.querySelectorAll('.home-mock-with-prop').length
        ).to.equal(0);
        expect(renderedComponent.container.querySelectorAll('.home-mock').length).to.not.equal(0);
      });
    });
  });
});
