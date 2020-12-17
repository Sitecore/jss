import { expect } from 'chai';
import processRenderings from './processRenderings';

const args = {
  dynamicPlaceholderKeyGenerator: (key: string, _: any, name: string) => `${key}/${name}`,
  placeholder: {
    phKey: '/',
  },
  rendering: {},
  components: [
    {
      name: 'lorem',
    },
    {
      name: 'ipsum',
    },
    {
      name: 'dolor',
    }
  ],
  componentFactory: (components: any, componentName: string) =>
    components.find((component: any) => component.name === componentName),
  datasourceNamer: ({ index }: any) => `name${index}`,
  datasourceDisplayNamer: ({ index }: any) => `displayName${index}`,
};

const initItem = (route: any) => ({
  name: route.name,
  template: 'template',
  layout: {
    renderings: [],
  },
});

describe('generateRouteItem pipeline', () => {
  describe('processRenderings processor', () => {
    it('should add renderings to item layout', () => {
      const route: any = {
        name: 'route',
        placeholders: {
          main: [
            {
              componentName: 'ipsum',
            },
            {
              componentName: 'dolor',
            }
          ],
        },
      };
      const item = initItem(route);

      const argObject: any = { ...args, route, item };

      const result = processRenderings(argObject);
      expect(result.item.layout.renderings.length).to.eql(2);
    });

    it('should auto name unnamed datasource', () => {
      const expectedName = 'name0';
      const expectedDisplayName = 'displayName0';
      const route: any = {
        name: 'route',
        placeholders: {
          main: [
            {
              componentName: 'lorem',
            }
          ],
        },
      };
      const item = initItem(route);

      const argObject: any = { ...args, route, item };
      const result = processRenderings(argObject);
      expect(result.item.layout.renderings[0].dataSource.name).to.eql(expectedName);
      expect(result.item.layout.renderings[0].dataSource.displayName).to.eql(expectedDisplayName);
    });

    it('should use provided name for datasource', () => {
      const expectedName = 'geoff';
      const expectedDisplayName = 'geoffDisplay';
      const route: any = {
        name: 'route',
        placeholders: {
          main: [
            {
              name: expectedName,
              displayName: expectedDisplayName,
              componentName: 'lorem',
            }
          ],
        },
      };
      const item = initItem(route);

      const argObject: any = { ...args, route, item };
      const result = processRenderings(argObject);
      expect(result.item.layout.renderings[0].dataSource.name).to.eql(expectedName);
      expect(result.item.layout.renderings[0].dataSource.displayName).to.eql(expectedDisplayName);
    });

    it('should throw if item has duplicate datasource names', () => {
      const duplicates = ['maple', 'sycamore'];
      const nonDuplicates = ['pine', 'hemlock', 'fir'];

      const components: any[] = [];
      [...duplicates, ...nonDuplicates].forEach((name) => {
        components.push({
          name,
          componentName: 'lorem',
        });
      });
      duplicates.forEach((name) => {
        components.push({
          name,
          componentName: 'ipsum',
        });
      });

      const route = {
        name: 'route',
        placeholders: {
          main: components,
        },
      };
      const item = initItem(route);

      const argObject: any = { ...args, route, item };

      // eslint-disable-next-line no-unused-expressions
      expect(() => processRenderings(argObject)).to.throw;
    });
  });
});
