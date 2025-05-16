/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentRendering, RouteData } from '@sitecore-jss/sitecore-jss/layout';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { stub } from 'sinon';
import { convertedData as eeData, emptyPlaceholderData } from '../test-data/ee-data';
import {
  byocWrapperData,
  feaasWrapperData,
  convertedDevData as nonEeDevData,
  convertedLayoutServiceData as nonEeLsData,
  sxaRenderingColumnSplitterVariant,
  sxaRenderingVariantDataWithCommonContainerName as sxaRenderingCommonContainerName,
  sxaRenderingVariantData,
  sxaRenderingVariantDoubleDigitDynamicPlaceholder as sxaRenderingDoubleDigitContainerName,
  sxaRenderingVariantDataWithoutCommonContainerName as sxaRenderingWithoutContainerName,
} from '../test-data/non-ee-data';
import * as SxaRichText from '../test-data/sxa-rich-text';
import * as BYOCComponent from './BYOCComponent';
import * as BYOCWrapper from './BYOCWrapper';
import * as FEAASComponent from './FEaaSComponent';
import * as FEAASWrapper from './FEaaSWrapper';
import { HiddenRendering } from './HiddenRendering';
import { MissingComponent, MissingComponentProps } from './MissingComponent';
import { Placeholder } from './Placeholder';
import { ComponentProps } from './PlaceholderCommon';
import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC>();

  // pass otherProps to page-content to test property cascading through the Placeholder

  const Home: React.FC<{ [prop: string]: unknown; rendering?: RouteData | ComponentRendering }> = ({
    rendering,
    render,
    renderEach,
    renderEmpty,
    ...otherProps
  }) => (
    <div className="home-mock">
      <Placeholder name="page-header" rendering={rendering} />
      <Placeholder name="page-content" rendering={rendering} {...otherProps} />
    </div>
  );

  components.set('Home', Home);

  const DownloadCallout: React.FC<{
    [prop: string]: unknown;
    fields?: { message?: { value?: string } };
  }> = (props) => (
    <div className="download-callout-mock">
      {props.fields.message ? props.fields.message.value : ''}
    </div>
  );

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <div className="jumbotron-mock" />);

  return components.get(componentName) || null;
};

describe('<Placeholder />', () => {
  const testData = [
    { label: 'Dev data', data: nonEeDevData },
    { label: 'LayoutService data - EE off', data: nonEeLsData },
    { label: 'LayoutService data - EE on', data: eeData },
  ];

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', () => {
        const component = (dataSet.data.sitecore.route.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName);
        const phKey = 'page-content';

        const renderedComponent = render(
          <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
        );

        expect(
          renderedComponent.container.querySelectorAll('.download-callout-mock').length
        ).to.equal(1);
      });

      it('should render nested placeholders', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder name={phKey} rendering={component} />
          </SitecoreContext>
        );

        expect(
          renderedComponent.container.querySelectorAll('.download-callout-mock').length
        ).to.equal(1);
      });

      it('should render components based on the rendereach function', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={component}
              renderEach={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.container.querySelectorAll('.wrapper').length).to.equal(1);
      });

      it('should render components based on the render function', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={component}
              render={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.container.querySelectorAll('.wrapper').length).to.equal(1);
      });

      it('when null passed to render function', () => {
        it('should render empty placeholder', () => {
          const component = dataSet.data.sitecore.route as RouteData;
          const phKey = 'main';

          const renderedComponent = render(
            <SitecoreContext componentFactory={componentFactory}>
              <Placeholder name={phKey} rendering={component} render={() => null} />
            </SitecoreContext>
          );

          expect(renderedComponent.container.innerHTML).to.be.equal('');
        });
      });

      it('should render output based on the renderEmpty function in case of no renderings', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const renderings = component.placeholders.main.filter(
          (c) => !(c as ComponentRendering).componentName
        );
        const myComponent = {
          ...component,
          placeholders: {
            ...component.placeholders,
            main: [...renderings],
          },
        };

        const phKey = 'main';

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={myComponent}
              renderEmpty={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.container.querySelectorAll('.wrapper').length).to.equal(1);
        expect(
          renderedComponent.container.querySelectorAll('.download-callout-mock').length
        ).to.equal(0);
        expect(renderedComponent.container.querySelectorAll('.home-mock').length).to.equal(0);
        expect(renderedComponent.container.querySelectorAll('.jumbotron-mock').length).to.equal(0);
      });

      it('should render output based on the renderEmpty function in case of empty placeholder', () => {
        const route = emptyPlaceholderData.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={route}
              renderEmpty={() => <span>My name is empty placeholder</span>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.container.innerHTML).to.equal(
          '<div class="sc-jss-empty-placeholder"><span>My name is empty placeholder</span></div>'
        );
      });

      it('should pass properties to nested components', () => {
        const component = dataSet.data.sitecore.route as any;
        const phKey = 'main';
        const expectedMessage = (component.placeholders.main as any[]).find((c) => c.componentName)
          .fields.message;

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder name={phKey} rendering={component} />
          </SitecoreContext>
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(
          renderedComponent.container
            .querySelector('.download-callout-mock')
            ?.innerHTML.indexOf(expectedMessage.value) !== -1
        ).to.be.true;
      });

      it('should apply modifyComponentProps to the final props', () => {
        const component = dataSet.data.sitecore.route as any;
        const phKey = 'main';
        const expectedMessage = (component.placeholders.main as any[]).find((c) => c.componentName)
          .fields.message;

        const modifyComponentProps = (props: ComponentProps) => {
          if (props.rendering?.componentName === 'DownloadCallout') {
            return {
              ...props,
              extraData: {
                x: true,
              },
            };
          }

          return props;
        };

        const renderedComponent = render(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={component}
              modifyComponentProps={modifyComponentProps}
            />
          </SitecoreContext>
        );

        expect(
          renderedComponent.container
            .querySelector('.download-callout-mock')
            ?.innerHTML.indexOf(expectedMessage.value) !== -1
        ).to.be.true;
        expect(renderedComponent.container.querySelectorAll('div.extra').length).to.equal(1);
      });
    });
  });

  describe('SXA rendering variants', () => {
    const componentFactory: ComponentFactory = (componentName: string, exportName?: string) => {
      const components = new Map();

      components.set('RichText', SxaRichText);

      if (exportName) return components.get(componentName)[exportName];

      return components.get(componentName) || null;
    };

    it('should render', () => {
      const component = sxaRenderingVariantData.sitecore.route as RouteData;
      const phKey = 'main';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(1);
      expect(
        renderedComponent.container.querySelector('.rendering-variant')?.getAttribute('class')
      ).to.equal(
        'rendering-variant col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 test-css-class-x'
      );
      expect(renderedComponent.container.querySelectorAll('.title').length).to.equal(1);
      expect(renderedComponent.container.querySelector('.title')?.textContent).to.equal(
        'Rich Text Rendering Variant'
      );
      expect(renderedComponent.container.querySelectorAll('.text').length).to.equal(1);
      expect(renderedComponent.container.querySelector('.text')?.textContent).to.equal(
        'Test RichText'
      );
    });

    it('should render with container-{*} type dynamic placeholder', () => {
      const component = sxaRenderingCommonContainerName.sitecore.route as RouteData;
      const phKey = 'container-1';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(1);
      expect(
        renderedComponent.container.querySelector('.rendering-variant')?.getAttribute('class')
      ).to.equal(
        'rendering-variant col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 test-css-class-x'
      );
      expect(renderedComponent.container.querySelectorAll('.title').length).to.equal(1);
      expect(renderedComponent.container.querySelector('.title')?.textContent).to.equal(
        'Rich Text Rendering Variant'
      );
    });

    it('should not render without container-{*} type dynamic placeholder', () => {
      const component = sxaRenderingWithoutContainerName.sitecore.route as RouteData;
      const phKey = 'richText';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(0);
      expect(renderedComponent.container.querySelectorAll('.title').length).to.equal(0);
    });

    it('should render with dynamic-1-{*} type dynamic placeholder', () => {
      const component = sxaRenderingDoubleDigitContainerName.sitecore.route as RouteData;
      const phKey = 'dynamic-1-{*}';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(1);
      expect(
        renderedComponent.container.querySelector('.rendering-variant')?.getAttribute('class')
      ).to.equal(
        'rendering-variant col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 test-css-class-x'
      );
      expect(renderedComponent.container.querySelectorAll('.title').length).to.equal(1);
      expect(renderedComponent.container.querySelector('.title')?.textContent).to.equal(
        'Rich Text Rendering Variant'
      );
    });

    it('should render another rendering variant', () => {
      const component = sxaRenderingVariantData.sitecore.route as RouteData;
      const phKey = 'main-second';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(1);
      expect(
        renderedComponent.container.querySelector('.rendering-variant')?.getAttribute('class')
      ).to.equal(
        'rendering-variant col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 test-css-class-y'
      );
      expect(renderedComponent.container.querySelectorAll('.default').length).to.equal(1);
    });

    it('should render column splitter rendering variant', () => {
      const component = sxaRenderingColumnSplitterVariant.sitecore.route as RouteData;
      const phKey = 'column-1-{*}';

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(1);
      expect(
        renderedComponent.container.querySelector('.rendering-variant')?.getAttribute('class')
      ).to.equal(
        'rendering-variant col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8 test-css-class-y'
      );
      expect(renderedComponent.container.querySelectorAll('.default').length).to.equal(1);
    });
  });

  describe('BYOC fallback', () => {
    let byocComponentStub;
    let byocWrapperStub;

    const componentFactory: ComponentFactory = (_componentName: string, _exportName?: string) =>
      null;

    it('should render', () => {
      const component = byocWrapperData.sitecore.route as RouteData;
      const phKey = 'main';

      byocComponentStub = stub(BYOCComponent, 'BYOCComponent').callsFake(() => (
        <p className="byoc-component">Foo</p>
      ));

      byocWrapperStub = stub(BYOCWrapper, 'BYOCWrapper').callsFake(() => (
        <div className="byoc-wrapper">
          <BYOCComponent.BYOCComponent />
        </div>
      ));

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.byoc-component').length).to.equal(2);
      expect(renderedComponent.container.querySelectorAll('.byoc-wrapper').length).to.equal(1);

      byocComponentStub.restore();
      byocWrapperStub.restore();
    });
  });

  describe('FEaaS fallback', () => {
    let feaasComponentStub;
    let feaasWrapperStub;

    const componentFactory: ComponentFactory = (_componentName: string, _exportName?: string) =>
      null;

    it('should render', () => {
      const component = feaasWrapperData.sitecore.route as RouteData;
      const phKey = 'main';

      feaasComponentStub = stub(FEAASComponent, 'FEaaSComponent').callsFake(() => (
        <p className="feaas-component">Foo</p>
      ));

      feaasWrapperStub = stub(FEAASWrapper, 'FEaaSWrapper').callsFake(() => (
        <div className="feaas-wrapper">
          <FEAASComponent.FEaaSComponent />
        </div>
      ));

      const renderedComponent = render(
        <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
      );

      expect(renderedComponent.container.querySelectorAll('.feaas-component').length).to.equal(2);
      expect(renderedComponent.container.querySelectorAll('.feaas-wrapper').length).to.equal(1);

      feaasComponentStub.restore();
      feaasWrapperStub.restore();
    });
  });

  it('should populate the "key" attribute of placeholder chrome', () => {
    const component: any = eeData.sitecore.route;
    const phKey = 'main';

    const renderedComponent = render(
      <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
    );

    const eeChrome = renderedComponent.container.querySelectorAll(
      `code#${phKey}[chrometype="placeholder"][kind="open"]`
    );
    expect(eeChrome.length).to.eq(1);
    const keyAttribute = eeChrome[0].getAttribute('key');
    expect(keyAttribute).to.not.be.undefined;
    expect(keyAttribute).to.eq(`${phKey}`);
  });

  it('should render empty placeholder', () => {
    const phKey = 'main';

    const renderedComponent = render(
      <Placeholder
        name={phKey}
        rendering={emptyPlaceholderData.sitecore.route}
        componentFactory={componentFactory}
      />
    );
    expect(
      renderedComponent.container.querySelectorAll('.sc-jss-empty-placeholder').length
    ).to.equal(1);
  });

  it('should render null for unknown placeholder', () => {
    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'Home',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'unknown';

    const renderedComponent = render(
      <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(renderedComponent?.container.innerHTML).to.be.empty;
  });

  it('should render error message on error', () => {
    const componentFactory: ComponentFactory = (componentName: string) => {
      const components = new Map<string, React.FC>();

      const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
        <div className="home-mock">
          <Placeholder name="main" rendering={rendering} />
        </div>
      );

      components.set('Home', Home);
      components.set('ThrowError', () => {
        throw Error('an error occured');
      });
      return components.get(componentName) || null;
    };

    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'ThrowError',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'main';

    const renderedComponent = render(
      <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
    );
    expect(
      renderedComponent.container.querySelectorAll('.sc-jss-placeholder-error').length
    ).to.equal(1);
  });

  it('should render custom errorComponent on error, if provided', () => {
    const componentFactory: ComponentFactory = (componentName: string) => {
      const components = new Map<string, React.FC<{ [key: string]: unknown }>>();

      const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
        <div className="home-mock">
          <Placeholder name="main" rendering={rendering} />
        </div>
      );

      components.set('Home', Home);
      components.set('ThrowError', () => {
        throw Error('an error occured');
      });
      return components.get(componentName) || null;
    };

    const CustomError: React.FC = () => <div className="custom-error">Custom Error</div>;

    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'ThrowError',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'main';

    const renderedComponent = render(
      <Placeholder
        name={phKey}
        rendering={route}
        componentFactory={componentFactory}
        errorComponent={CustomError}
      />
    );
    expect(renderedComponent.container.querySelectorAll('.custom-error').length).to.equal(1);
  });
});

it('should render MissingComponent for unknown rendering', () => {
  const route: any = {
    placeholders: {
      main: [
        {
          componentName: 'Unknown',
        },
      ],
    },
  };
  const phKey = 'main';

  const CustomMissingComponent: React.FC<MissingComponentProps> = (props) => (
    <div className="missing-component">
      <MissingComponent {...props} />
    </div>
  );

  const renderedComponent = render(
    <Placeholder
      name={phKey}
      rendering={route}
      componentFactory={componentFactory}
      missingComponentComponent={CustomMissingComponent}
    />
  );
  expect(renderedComponent.container.querySelectorAll('.missing-component').length).to.equal(1);
});

it('should render nothing for rendering without a name', () => {
  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC<{ [key: string]: unknown }>>();

    const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
      <div className="home-mock"></div>
    );

    components.set('Home', Home);
    return components.get(componentName) || null;
  };

  const route: any = {
    placeholders: {
      main: [
        {
          componentName: 'Home',
        },
        {
          componentName: null,
        },
      ],
    },
  };
  const phKey = 'main';

  const renderedComponent = render(
    <div className="empty-test">
      <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
    </div>
  );
  expect(renderedComponent.container.children.length).to.equal(1);
});

it('should render HiddenRendering when rendering is hidden', () => {
  const route: any = {
    placeholders: {
      main: [
        {
          componentName: 'Hidden Rendering',
        },
      ],
    },
  };
  const phKey = 'main';

  const renderedComponent = render(
    <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
  );
  expect(renderedComponent.getAllByText('The component is hidden').length).to.equal(1);
});

it('should render custom HiddenRendering when rendering is hidden', () => {
  const route: any = {
    placeholders: {
      main: [
        {
          componentName: 'Hidden Rendering',
        },
      ],
    },
  };
  const phKey = 'main';

  const CustomHiddenRendering: React.FC<any> = (props) => (
    <div className="hidden-rendering">
      <HiddenRendering />
      <p>{props.rendering.componentName}</p>
    </div>
  );

  const renderedComponent = render(
    <Placeholder
      name={phKey}
      rendering={route}
      componentFactory={componentFactory}
      hiddenRenderingComponent={CustomHiddenRendering}
    />
  );
  expect(renderedComponent.container.querySelectorAll('.hidden-rendering').length).to.equal(1);
  expect(
    expect(renderedComponent.container.querySelector('.hidden-rendering p')?.textContent).to.equal(
      'Hidden Rendering'
    )
  );
});

after(() => {
  (global as any).window.close();
});
