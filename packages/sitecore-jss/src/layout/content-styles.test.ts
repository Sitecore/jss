/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  traverseField,
  traverseComponent,
  getContentStylesheetUrl,
  traversePlaceholder,
  getContentStylesheetLink,
} from './content-styles';
import { ComponentRendering, Field, HtmlElementRendering, Item, LayoutServiceData } from './models';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';

describe('content-styles', () => {
  const truthyValue = { value: '<div class="test bar"><p class="foo ck-content">bar</p></div>' };
  const falsyValue = { value: '<div class="test bar"><p class="foo">ck-content</p></div>' };

  describe('getContentStylesheetLink', () => {
    it('should return null when route data is empty', () => {
      expect(getContentStylesheetLink({ sitecore: { context: {}, route: null } })).to.be.null;
    });

    it('should set "loadStyles: false" when layout does not have a ck-content class', () => {
      const layoutData: LayoutServiceData = {
        sitecore: {
          context: {},
          route: {
            name: 'route',
            placeholders: {
              car: [{ componentName: 'foo', fields: { car: falsyValue } }],
            },
          },
        },
      };

      expect(getContentStylesheetLink(layoutData)).to.be.null;
    });

    it('should set "loadStyles: true" when layout has a ck-content class', () => {
      const layoutData: LayoutServiceData = {
        sitecore: {
          context: {},
          route: {
            name: 'route',
            placeholders: {
              car: [
                {
                  componentName: 'foo',
                  fields: { car: falsyValue },
                  placeholders: {
                    bar: [{ componentName: 'cow', fields: { dog: truthyValue } }],
                  },
                },
              ],
            },
          },
        },
      };

      expect(getContentStylesheetLink(layoutData)).to.deep.equal({
        href: `${SITECORE_EDGE_URL_DEFAULT}/pages/styles/content-styles.min.css`,
        rel: 'stylesheet',
      });
    });
  });

  describe('traverseField', () => {
    describe('Field', () => {
      it('should set "loadStyles: false" when field does not have a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Field = {
          value: '<div class="test bar"><p class="foo">ck-content</p></div>',
        };

        traverseField(field, config);

        expect(config.loadStyles).to.be.false;
      });

      it('should set "loadStyles: true" when field has a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Field = {
          value: '<div class="test bar"><p class="foo ck-content">bar</p></div>',
        };

        traverseField(field, config);

        expect(config.loadStyles).to.be.true;
      });
    });

    describe('Item', () => {
      it('should set "loadStyles: false" when field does not have a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Item = {
          name: 'test',
          fields: {
            richText: {
              value: '<div class="test bar"><p class="foo">ck-content</p></div>',
            },
          },
        };

        traverseField(field, config);

        expect(config.loadStyles).to.be.false;
      });

      it('should set "loadStyles: true" when field has a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Item = {
          name: 'test',
          fields: {
            richText: {
              value: '<div class="test bar"><p class="foo ck-content">bar</p></div>',
            },
          },
        };

        traverseField(field, config);

        expect(config.loadStyles).to.be.true;
      });
    });

    describe('Item[]', () => {
      it('should set "loadStyles: false" when field does not have a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Item[] = [
          {
            name: 'test',
            fields: {
              richText: {
                value: '<div class="test bar"><p class="foo">ck-content</p></div>',
              },
            },
          },
        ];

        traverseField(field, config);

        expect(config.loadStyles).to.be.false;
      });

      it('should set "loadStyles: true" when field has a ck-content class', () => {
        const config = { loadStyles: false };
        const field: Item[] = [
          {
            name: 'test',
            fields: {
              richText: {
                value: '<div class="test bar"><p class="foo ck-content">bar</p></div>',
              },
            },
          },
        ];

        traverseField(field, config);

        expect(config.loadStyles).to.be.true;
      });
    });

    it('should skip when field is undefined', () => {
      const config = { loadStyles: false };
      const field = undefined;

      traverseField(field, config);

      expect(config.loadStyles).to.be.false;
    });

    it('should skip when loadStyles is true', () => {
      const config = { loadStyles: true };
      const field = falsyValue;

      traverseField(field, config);

      expect(config.loadStyles).to.be.true;
    });
  });

  describe('traverseComponent', () => {
    it('should skip when loadStyles is true', () => {
      const config = { loadStyles: true };
      const component = {
        componentName: 'ContentBlock',
        fields: {
          richText: falsyValue,
        },
      };

      traverseComponent(component, config);

      expect(config.loadStyles).to.be.true;
    });

    it('should set "loadStyles: false" when component does not have a ck-content class', () => {
      const config = { loadStyles: false };
      const component = {
        componentName: 'ContentBlock',
        fields: {
          richText: falsyValue,
        },
        placeholders: {
          foo: [{ componentName: 'fooComponent', fields: { car: falsyValue } }],
        },
      };

      traverseComponent(component, config);

      expect(config.loadStyles).to.be.false;
    });

    it('should set "loadStyles: true" when component has a ck-content class', () => {
      const config = { loadStyles: false };
      const component = {
        componentName: 'ContentBlock',
        fields: {
          richText: falsyValue,
        },
        placeholders: {
          foo: [{ componentName: 'fooComponent', fields: { car: truthyValue } }],
        },
      };

      traverseComponent(component, config);

      expect(config.loadStyles).to.be.true;
    });

    describe('editing', () => {
      it('should set "loadStyles: false" when component does not have a ck-content class', () => {
        const config = { loadStyles: false };
        const component = {
          componentName: 'ContentBlock',
          contents: falsyValue.value,
        };

        traverseComponent(component, config);

        expect(config.loadStyles).to.be.false;
      });

      it('should set "loadStyles: true" when component has a ck-content class', () => {
        const config = { loadStyles: false };
        const component = {
          componentName: 'ContentBlock',
          contents: truthyValue.value,
        };

        traverseComponent(component, config);

        expect(config.loadStyles).to.be.true;
      });
    });
  });

  describe('traversePlaceholder', () => {
    it('should skip when loadStyles is true', () => {
      const config = { loadStyles: true };
      const components = [
        {
          componentName: 'ContentBlock',
          fields: {
            richText: falsyValue,
          },
        },
      ];

      traversePlaceholder(components, config);

      expect(config.loadStyles).to.be.true;
    });

    it('should set "loadStyles: false" when placeholder does not have a ck-content class', () => {
      const config = { loadStyles: false };
      const components: (ComponentRendering | HtmlElementRendering)[] = [
        {
          componentName: 'ContentBlock',
          fields: {
            richText: falsyValue,
          },
          placeholders: {
            foo: [{ componentName: 'foo', fields: { car: falsyValue } }],
          },
        },
        {
          componentName: 'Foo',
          fields: {
            car: falsyValue,
          },
          placeholders: {
            body: [{ componentName: 'foo', fields: { car: falsyValue } }],
          },
        },
      ];

      traversePlaceholder(components, config);

      expect(config.loadStyles).to.be.false;
    });

    it('should set "loadStyles: true" when component has a ck-content class', () => {
      const config = { loadStyles: false };
      const components: (ComponentRendering | HtmlElementRendering)[] = [
        {
          componentName: 'ContentBlock',
          fields: {
            richText: falsyValue,
          },
          placeholders: {
            foo: [{ componentName: 'foo', fields: { car: falsyValue } }],
          },
        },
        {
          componentName: 'Foo',
          fields: {
            car: falsyValue,
          },
          placeholders: {
            body: [{ componentName: 'foo', fields: { car: truthyValue } }],
          },
        },
      ];

      traversePlaceholder(components, config);

      expect(config.loadStyles).to.be.true;
    });
  });

  describe('getContentStylesheetUrl', () => {
    it('should return the default url', () => {
      expect(getContentStylesheetUrl()).to.equal(
        `${SITECORE_EDGE_URL_DEFAULT}/pages/styles/content-styles.min.css`
      );
    });

    it('should return the custom url', () => {
      expect(getContentStylesheetUrl('https://foo.bar')).to.equal(
        'https://foo.bar/pages/styles/content-styles.min.css'
      );
    });
  });
});
