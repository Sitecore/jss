/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { ComponentRendering, RouteData } from '@sitecore-jss/sitecore-jss/layout';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { spy, stub } from 'sinon';
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
import * as metadataData from '../test-data/metadata-data';
import * as SxaRichText from '../test-data/sxa-rich-text';
import * as BYOCComponent from './BYOCComponent';
import * as BYOCWrapper from './BYOCWrapper';
import * as FEAASComponent from './FEaaSComponent';
import * as FEAASWrapper from './FEaaSWrapper';
import * as HiddenRendering from './HiddenRendering';
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
    extraDiv?: boolean;
  }> = (props) => (
    <div className="download-callout-mock">
      {props.fields.message ? props.fields.message.value : ''}
      {props.extraDiv ? <div className="extra">extra!</div> : null}
    </div>
  );

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <div className="jumbotron-mock" />);

  return components.get(componentName) || null;
};

describe('<Placeholder />', () => {
  const testData = [
    { label: 'Dev data', data: nonEeDevData },
    { label: 'LayoutService data - Editing off', data: nonEeLsData },
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
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder name={phKey} rendering={component} />
          </SitecoreContext>
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

      it('should render empty placeholder', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'mainEmpty';

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
      const phKey = 'mainEmpty';

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
            extraDiv: true,
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
    );

    expect(renderedComponent.container.querySelectorAll('.rendering-variant').length).to.equal(0);
    expect(renderedComponent.container.querySelectorAll('.title').length).to.equal(0);
  });

  it('should render with dynamic-1-{*} type dynamic placeholder', () => {
    const component = sxaRenderingDoubleDigitContainerName.sitecore.route as RouteData;
    const phKey = 'dynamic-1-{*}';

    const renderedComponent = render(
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
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

  const componentFactory: ComponentFactory = (_componentName: string, _exportName?: string) => null;

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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
    );

    expect(renderedComponent.container.querySelectorAll('.byoc-component').length).to.equal(2);
    expect(renderedComponent.container.querySelectorAll('.byoc-wrapper').length).to.equal(1);

    byocComponentStub.restore();
    byocWrapperStub.restore();
  });

  it.skip('should render ErrorBoundary without Suspense for byoc wrapper', () => {
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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
    );

    expect(renderedComponent.container.querySelectorAll('ErrorBoundary').length).to.equal(2);
    expect(renderedComponent.container.querySelectorAll('Suspense').length).to.equal(1);

    byocComponentStub.restore();
    byocWrapperStub.restore();
  });
});

describe('FEaaS fallback', () => {
  let feaasComponentStub;
  let feaasWrapperStub;

  const componentFactory: ComponentFactory = (_componentName: string, _exportName?: string) => null;

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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={component} />
      </SitecoreContext>
    );

    expect(renderedComponent.container.querySelectorAll('.feaas-component').length).to.equal(2);
    expect(renderedComponent.container.querySelectorAll('.feaas-wrapper').length).to.equal(1);

    feaasComponentStub.restore();
    feaasWrapperStub.restore();
  });
});

it.skip('should not render Suspense when disableSuspense is true', () => {
  const component = sxaRenderingVariantData.sitecore.route as RouteData;
  const phKey = 'main';

  const renderedComponent = render(
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} disableSuspense={true} rendering={component} />
    </SitecoreContext>
  );

  expect(renderedComponent.container.querySelectorAll('ErrorBoundary').length).to.equal(1);
  expect(renderedComponent.container.querySelectorAll('Suspense').length).to.equal(0);
});

it('should populate the "key" attribute of placeholder chrome', () => {
  const component: any = eeData.sitecore.route;
  const phKey = 'main';

  const renderedComponent = render(
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={component} />
    </SitecoreContext>
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
  const phKey = 'mainEmpty';

  const renderedComponent = render(
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={emptyPlaceholderData.sitecore.route} />
    </SitecoreContext>
  );
  expect(renderedComponent.container.querySelectorAll('.sc-jss-empty-placeholder').length).to.equal(
    1
  );
});

it('should render empty placeholder with no extra markup', () => {
  const phKey = 'mainEmpty';

  const renderedComponent = render(
    <Placeholder
      name={phKey}
      rendering={emptyPlaceholderData.sitecore.route}
      componentFactory={componentFactory}
    />
  );
  const emptyPlaceholder = renderedComponent.container.querySelectorAll(
    '.sc-jss-empty-placeholder'
  );
  // TODO: change this as needed when merging "simplify editing" feature changes into dev
  expect(emptyPlaceholder[0]?.outerHTML).to.equal(
    [
      '<div class="sc-jss-empty-placeholder">',
      '<code type="text/sitecore" chrometype="placeholder" kind="open" id="main" class="scpm" data-selectable="true" phkey="main" key="main">',
      '{}',
      '</code>',
      '<code type="text/sitecore" id="scEnclosingTag_" chrometype="placeholder" kind="close" hintname="main" class="scpm">',
      '</code>',
      '</div>',
    ].join('')
  );
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
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={route} />
    </SitecoreContext>
  );
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
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={route} />
    </SitecoreContext>
  );
  expect(renderedComponent.container.querySelectorAll('.sc-jss-placeholder-error').length).to.equal(
    1
  );
});

it('should render error message on error, only for the errored component', () => {
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
    components.set('Foo', () => <div className="foo-class">foo</div>);

    return components.get(componentName) || null;
  };

  const route = ({
    placeholders: {
      main: [
        {
          componentName: 'ThrowError',
        },
        {
          componentName: 'Foo',
        },
      ],
    },
  } as unknown) as RouteData;
  const phKey = 'main';

  const renderedComponent = render(
    <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
  );
  expect(renderedComponent.container.querySelectorAll('.sc-jss-placeholder-error').length).to.equal(
    1
  );
  expect(renderedComponent.container.querySelectorAll('div.foo-class').length).to.equal(1);
});

it('should render custom errorComponent on error, if provided', () => {
  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC<{ [key: string]: unknown }>>();

    const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
      <div className="home-mock">
        <SitecoreContext componentFactory={componentFactory}>
          <Placeholder name="main" rendering={rendering} />
        </SitecoreContext>
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
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={route} errorComponent={CustomError} />
    </SitecoreContext>
  );
  expect(renderedComponent.container.querySelectorAll('.custom-error').length).to.equal(1);
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
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder
        name={phKey}
        rendering={route}
        missingComponentComponent={CustomMissingComponent}
      />
    </SitecoreContext>
  );
  expect(renderedComponent.container.querySelectorAll('.missing-component').length).to.equal(1);
});

it('should render nothing for rendering without a name', () => {
  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC<{ [key: string]: unknown }>>();

    const Home: React.FC<{ rendering?: RouteData }> = () => <div className="home-mock"></div>;

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
      <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name={phKey} rendering={route} />
      </SitecoreContext>
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
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder name={phKey} rendering={route} />
    </SitecoreContext>
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
      <HiddenRendering.HiddenRendering />
      <p>{props.rendering.componentName}</p>
    </div>
  );

  const renderedComponent = render(
    <SitecoreContext componentFactory={componentFactory}>
      <Placeholder
        name={phKey}
        rendering={route}
        hiddenRenderingComponent={CustomHiddenRendering}
      />
    </SitecoreContext>
  );
  expect(renderedComponent.container.querySelectorAll('.hidden-rendering').length).to.equal(1);
  expect(
    expect(renderedComponent.container.querySelector('.hidden-rendering p')?.textContent).to.equal(
      'Hidden Rendering'
    )
  );
});

describe('PlaceholderMetadata', () => {
  const {
    layoutData,
    layoutDataForNestedDynamicPlaceholder,
    layoutDataWithEmptyPlaceholder,
    layoutDataWithUnknownComponent,
  } = metadataData;

  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC>();

    components.set('Header', () => (
      <div className="header-wrapper">
        <Placeholder name="logo" rendering={layoutData.sitecore.route.placeholders.main[0]} />
      </div>
    ));
    components.set('Logo', () => <div className="Logo-mock" />);

    return components.get(componentName) || null;
  };

  it('should render <PlaceholderMetadata> with nested placeholder components', () => {
    const wrapper = render(
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name="main" rendering={layoutData.sitecore.route} />
      </SitecoreContext>,
      { container: document.body }
    );

    expect(wrapper?.baseElement.innerHTML).to.equal(
      [
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
      ].join('')
    );

    expect(wrapper?.container.querySelectorAll('.scpm').length).to.equal(8);
  });

  it('should render code blocks even if placeholder is empty', () => {
    const wrapper = render(
      <SitecoreContext
        componentFactory={componentFactory}
        layoutData={layoutDataWithEmptyPlaceholder}
      >
        <Placeholder name="main" rendering={layoutDataWithEmptyPlaceholder.sitecore.route} />
      </SitecoreContext>,
      { container: document.body }
    );

    expect(wrapper.baseElement?.innerHTML).to.equal(
      [
        '<div class="sc-jss-empty-placeholder">',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
        '</div>',
      ].join('')
    );
  });

  it('should render missing component with code blocks if component is not registered', () => {
    const wrapper = render(
      <SitecoreContext
        componentFactory={componentFactory}
        layoutData={layoutDataWithUnknownComponent}
      >
        <Placeholder name="main" rendering={layoutDataWithUnknownComponent.sitecore.route} />
      </SitecoreContext>
    );

    expect(wrapper?.container.innerHTML).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
        '<div style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;"><h2>Unknown</h2><p>JSS component is missing React implementation. See the developer console for more information.</p></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
      ].join('')
    );
  });

  it('should render dynamic placeholder', () => {
    const phKey = 'container-1';
    const layoutData = layoutDataForNestedDynamicPlaceholder('container-{*}');
    const wrapper = render(
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name={phKey} rendering={layoutData.sitecore.route} />
      </SitecoreContext>
    );

    expect(wrapper?.container.innerHTML).to.equal(
      [
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
      ].join('')
    );

    expect(wrapper?.container.querySelectorAll('.scpm')?.length).to.equal(8);
  });

  it('should render double digit dynamic placeholder', () => {
    const phKey = 'container-1-2';
    const layoutData = layoutDataForNestedDynamicPlaceholder('container-1-{*}');
    const wrapper = render(
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name={phKey} rendering={layoutData.sitecore.route} />
      </SitecoreContext>
    );

    expect(wrapper?.container.innerHTML).to.equal(
      [
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
      ].join('')
    );

    // 4 placeholders in total, 8 code blocks
    expect(wrapper?.container.querySelectorAll('.scpm').length).to.equal(8);
  });
});

after(() => {
  (global as any).window.close();
});
