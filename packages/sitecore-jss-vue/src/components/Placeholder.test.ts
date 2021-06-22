/* eslint-disable vue/one-component-per-file */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-expressions */

import { h, defineComponent } from 'vue';

import { Placeholder } from './Placeholder';
import { SitecoreContext } from './SitecoreContext';

import DownloadCallout from '../test/components/sfc/DownloadCallout.vue';
import Home from '../test/components/sfc/Home.vue';
import SampleScopedSlotPlaceholder from '../test/components/sfc/SampleScopedSlotPlaceholder.vue';
import SampleScopedSlotPlaceholderEmpty from '../test/components/sfc/SampleScopedSlotPlaceholderEmpty.vue';

import { devData } from '../test/data/dev-data';
import { lsDataEeOff } from '../test/data/LS-data-EE-off';
import { lsDataEeOn } from '../test/data/LS-data-EE-on';

import { mount } from '@vue/test-utils';
import { ComponentRendering, RouteData } from '@sitecore-jss/sitecore-jss';

// import { config } from '@vue/test-utils'
// config.logModifiedComponents = false;

const testComponents: any = {
  sfc: {
    Home,
    DownloadCallout,
  },
  // pass otherProps to page-content to test property cascading through the Placeholder
  Home: defineComponent({
    props: {
      rendering: { type: Object as () => ComponentRendering | RouteData, default: () => ({}) },
      fields: { type: Object, default: () => ({}) },
      params: { type: Object, default: () => ({}) },
    },

    render() {
      const { rendering, ...otherProps } = this.$props;
      const arbitraryProp = { value: 'magical', withFunction: () => 'indeed' };

      return h('div', { class: 'home-mock' }, [
        h(Placeholder, {
          name: 'page-header',
          rendering,
        }),
        h(Placeholder, {
          name: 'page-content',
          rendering,
          // "unknown"/unmapped props need to be passed in as attributes,
          // otherwise the Placeholder will ignore them.
          // An unfortunate limitation of Vue.
          arbitrary: arbitraryProp,
          ...otherProps,
        }),
      ]);
    },
  }),
  DownloadCallout: defineComponent({
    props: {
      fields: { type: Object, default: () => ({}) },
      arbitrary: { type: Object, default: () => ({}) },
      rendering: { type: Object, default: () => ({}) },
      params: { type: Object, default: () => ({}) },
    },

    render() {
      return h('div', { class: 'download-callout-mock' }, [
        `message: ${this.$props.fields.message ? this.$props.fields.message.value : 'no message'}`,
        h('br'),
        `arbitrary: ${this.$props.arbitrary.value || 'no value'}`,
        h('br'),
        `arbitrary function: ${
          this.$props.arbitrary.withFunction ? this.$props.arbitrary.withFunction() : 'no function'
        }`,
      ]);
    },
  }),
  Jumbotron: defineComponent({
    inheritAttrs: false,

    render() {
      return h('div', { class: 'jumbotron-mock' });
    },
  }),
  ErrorThrowingComponent: defineComponent({
    render() {
      const blah: any = null;
      return blah.nonExistantProperty;
    },
  }),
};

const componentFactory = (componentName: string) => {
  const components = new Map();
  components.set('Home', testComponents.Home);
  components.set('SfcHome', testComponents.sfc.Home);
  components.set('DownloadCallout', testComponents.DownloadCallout);
  components.set('SfcDownloadCallout', testComponents.sfc.DownloadCallout);
  components.set('Jumbotron', testComponents.Jumbotron);
  components.set('ErrorThrowingComponent', testComponents.ErrorThrowingComponent);
  return components.get(componentName);
};

describe('<Placeholder />', () => {
  const testData = [
    { label: 'Dev data', data: devData },
    { label: 'LayoutService data - EE off', data: lsDataEeOff },
    { label: 'LayoutService data - EE on', data: lsDataEeOn },
  ];

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', () => {
        const phData: any = dataSet.data.sitecore.route.placeholders.main;
        const component = phData.find((c: any) => c.componentName);
        const phKey = 'page-content';

        const renderedComponent = mount(Placeholder, {
          props: {
            name: phKey,
            rendering: component,
            componentFactory,
          },
        });

        // this will create a snapshot of the rendered component.
        // you'll need to visually inspect the snapshot to ensure expected rendering.
        // subsequent test runs will then compare the rendered output to the snapshot.
        expect(renderedComponent.html()).toMatchSnapshot();
      });

      it('should render nested placeholders', () => {
        const component = dataSet.data.sitecore.route;
        const phKey = 'main';

        const testComponent = {
          render() {
            return h(
              SitecoreContext,
              {
                componentFactory,
              },
              () => [
                h(Placeholder, {
                  name: phKey,
                  rendering: component as any,
                  componentFactory,
                }),
              ]
            );
          },
        };

        const renderedComponent = mount(testComponent);
        expect(renderedComponent.html()).toMatchSnapshot();
      });

      it('should pass properties to nested components', () => {
        const component = dataSet.data.sitecore.route;
        const phKey = 'main';

        const testComponent = {
          render() {
            return h(SitecoreContext, { componentFactory }, () => [
              h(Placeholder, { name: phKey, rendering: component as any }),
            ]);
          },
        };

        const renderedComponent = mount(testComponent);
        expect(renderedComponent.html()).toMatchSnapshot();
      });

      it('should render components via default scoped slot (i.e. render prop)', () => {
        const component = dataSet.data.sitecore.route;
        const phKey = 'main';

        const testComponent = {
          render() {
            return h(SitecoreContext, { componentFactory }, () => [
              h(SampleScopedSlotPlaceholder, {
                name: phKey,
                rendering: component,
              }),
            ]);
          },
        };

        const renderedComponent = mount(testComponent);
        expect(renderedComponent.html()).toMatchSnapshot();
      });
    });
  });

  describe('missing component', () => {
    let errorSpy: jest.SpyInstance;
    let warnSpy: jest.SpyInstance;
    let logSpy: jest.SpyInstance;

    const route = {
      placeholders: {
        main: [
          { componentName: 'Home' },
          { componentName: 'SfcHome' },
          { componentName: 'whatisthis' },
        ],
      },
    };

    beforeEach(() => {
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // swallow warnings so the console isn't so noisy during tests
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      errorSpy.mockRestore();
      warnSpy.mockRestore();
      logSpy.mockRestore();
    });

    it('should render default missing component for unknown components', () => {
      const testComponent = {
        render() {
          return h(Placeholder, {
            name: 'main',
            rendering: route as any,
            componentFactory,
          });
        },
      };

      const renderedComponent = mount(testComponent);
      expect(renderedComponent.html()).toMatchSnapshot();

      warnSpy.mockReset();
    });

    it('should render specific missing component for unknown components', () => {
      const missingComponent = defineComponent({
        inheritAttrs: false,

        render() {
          return h('div', null, 'this is a custom missing component');
        },
      });

      const testComponent = defineComponent({
        render() {
          return h(Placeholder, {
            name: 'main',
            rendering: route as any,
            componentFactory,
            missingComponentComponent: missingComponent,
          });
        },
      });

      const renderedComponent = mount(testComponent);
      expect(renderedComponent.html()).toMatchSnapshot();
    });
  });

  it('should render null for unknown placeholder', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    warnSpy.mockImplementation(() => {});
    const route = { placeholders: { main: [{ componentName: 'Home' }] } };
    const phKey = 'unknown-test';

    const renderedComponent = mount(Placeholder, {
      props: {
        name: phKey,
        rendering: route as any,
        componentFactory,
      },
    });

    expect(renderedComponent.element.innerHTML).toBe(undefined);

    warnSpy.mockRestore();
  });

  it('should render empty placeholder template for empty placeholder', () => {
    const phKey = 'main';

    const renderingData = {
      placeholders: {
        [phKey]: [
          {
            name: 'code',
            type: 'text/sitecore',
            contents: 'this is the only element that should render within the "li" element',
            attributes: { type: 'text/sitecore' },
          },
        ],
      },
    };

    const testComponent = {
      render() {
        return h(SampleScopedSlotPlaceholderEmpty, {
          componentFactory,
          rendering: renderingData,
          name: phKey,
        });
      },
    };

    const renderedComponent = mount(testComponent);
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  // These tests are unfortunately skipped for now.
  // vue-test-utils doesn't seem capable currently of testing the `errorCaptured` lifecycle hook
  // that the Placeholder component uses. When the testComponent is mounted and an error occurs
  // the error causes the test to fail prior to evaluating assertions.
  // There's probably a clever way to do it, but too clever for me.
  // describe.skip('when rendering error occurs', () => {
  //   const route = {
  //     placeholders: {
  //       main: [{ componentName: 'ErrorThrowingComponent' }],
  //     },
  //   };

  //   it('should render custom error component if provided', () => {
  //     const errorComponent = {
  //       props: { error: { type: Error } },
  //       render() {
  //         return h('div', {}, 'this is a custom error component');
  //       },
  //     };

  //     const testComponent = {
  //       render() {
  //         return h(Placeholder, {
  //           props: { name: 'main', rendering: route, componentFactory, errorComponent },
  //         });
  //       },
  //     };

  //     const renderedComponent = mount(testComponent);
  //     expect(renderedComponent.html()).toMatchSnapshot();
  //   });

  //   it('should render default error component if no custom error component provided', () => {
  //     const testComponent = {
  //       render() {
  //         return h(Placeholder, {
  //           props: { name: 'main', rendering: route, componentFactory },
  //         });
  //       },
  //     };

  //     const renderedComponent = mount(testComponent);
  //     expect(renderedComponent.html()).toMatchSnapshot();
  //   });
  // });
});
