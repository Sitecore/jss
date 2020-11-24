import { ComponentRendering, PlaceholdersData } from '@sitecore-jss/sitecore-jss';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import {IncomingMessage, ServerResponse} from 'http';
import {ParsedUrlQuery} from 'querystring';
import { ComponentPropsService, ComponentPropsRequest } from './component-props-service';

use(spies);

describe('ComponentPropsService', () => {
  const service = new ComponentPropsService();

  const rendering = (name: string): ComponentRendering => ({
    uid: name,
    componentName: name,
  });

  type CustomContext = { locale: string };

  const placeholders = {
    x11ph: [
      rendering('x11'),
      {
        ...rendering('x12'),
        placeholders: {
          x12ph: [rendering('x13'), rendering('x14')],
          x13ph: [
            {
              ...rendering('x15'),
              placeholders: {
                x14ph: [rendering('x16'), rendering('x17')],
              },
            },
          ],
        },
      },
    ],
    x21ph: [
      rendering('x21'),
      {
        ...rendering('x22'),
        placeholders: {
          x22ph: [rendering('x23')],
        },
      },
      rendering('x24'),
    ],
  };

  const layoutData = {
    sitecore: {
      context: {},
      route: {
        name: 'route1',
        placeholders,
      },
    },
  };

	const context = { locale: 'en' };

  const fetchFn = (expectedData: unknown) => spy(() => Promise.resolve(expectedData));

  const req = (
    expectedData: unknown,
    componentName: string
  ): ComponentPropsRequest<CustomContext> => ({
    fetch: fetchFn(expectedData),
    layoutData,
    rendering: rendering(componentName),
    context,
  });

  const modules: { [componentName: string]: any } = {
    x11: {
      fn: fetchFn('x11Data'),
    },
    x14: {
      fn: fetchFn('x14Data'),
    },
    x16: {
      fn: fetchFn('x16Data'),
    },
    x23: {
      fn: fetchFn('x23Data'),
    },
    x24: {
      fn: fetchFn('x24Data'),
    },
  };

  const componentModule = (componentName: string) => modules[componentName];

  const fetchFunctionFactory = (componentName: string) => {
    const module = componentModule(componentName);

    return module?.fn;
	};

	it('fetchServerSideComponentProps', async () => {
		const ssrModules: { [componentName: string]: any } = {
			x11: {
				getServerSideProps: fetchFn('x11SSRData'),
			},
			x14: {
				getServerSideProps: fetchFn('x14SSRData'),
			},
			x16: {
				getServerSideProps: fetchFn('x16SSRData'),
			},
			x23: {
				getServerSideProps: fetchFn('x23SSRData'),
			},
			x24: {
				getServerSideProps: fetchFn('x24SSRData'),
			},
		};

		const ssrContext = {
			req: {} as IncomingMessage,
			res: {} as ServerResponse,
			query: {} as ParsedUrlQuery,
			resolvedUrl: ''
		}

		const ssrComponentModule = (componentName: string) => ssrModules[componentName];

		const result = await service.fetchServerSideComponentProps({
			componentModule: ssrComponentModule,
			context: ssrContext,
			layoutData
		})

		expect(result).to.deep.equal({
			x11: 'x11SSRData',
			x14: 'x14SSRData',
			x16: 'x16SSRData',
			x23: 'x23SSRData',
			x24: 'x24SSRData'
		})
	})
	
	it('fetchStaticComponentProps', async () => {
		const ssgModules: { [componentName: string]: any } = {
			x11: {
				getStaticProps: fetchFn('x11StaticData'),
			},
			x14: {
				getStaticProps: fetchFn('x14StaticData'),
			},
			x16: {
				getStaticProps: fetchFn('x16StaticData'),
			},
			x23: {
				getStaticProps: fetchFn('x23StaticData'),
			},
			x24: {
				getStaticProps: fetchFn('x24StaticData'),
			},
		};

		const ssgComponentModule = (componentName: string) => ssgModules[componentName];

		const result = await service.fetchStaticComponentProps({
			componentModule: ssgComponentModule,
			context,
			layoutData
		})

		expect(result).to.deep.equal({
			x11: 'x11StaticData',
			x14: 'x14StaticData',
			x16: 'x16StaticData',
			x23: 'x23StaticData',
			x24: 'x24StaticData'
		})
	})

  it('fetchComponentProps', async () => {
    const fetchedData = await service.fetchComponentProps<CustomContext>(
      fetchFunctionFactory,
      layoutData,
      context
    );

    expect(fetchedData).to.deep.equal({
			x11: 'x11Data',
			x14: 'x14Data',
			x16: 'x16Data',
			x23: 'x23Data',
			x24: 'x24Data'
		});
  });

  it('collectRequests', () => {
    const requests = service.collectRequests({
      context,
      layoutData,
      placeholders,
      fetchFunctionFactory,
    });

    expect(requests).to.deep.equal([
      {
        fetch: modules.x11.fn,
        rendering: { uid: 'x11', componentName: 'x11' },
        layoutData,
        context,
      },
      {
        fetch: modules.x14.fn,
        rendering: { uid: 'x14', componentName: 'x14' },
        layoutData,
        context,
      },
      {
        fetch: modules.x16.fn,
        rendering: { uid: 'x16', componentName: 'x16' },
        layoutData,
        context,
      },
      {
        fetch: modules.x23.fn,
        rendering: { uid: 'x23', componentName: 'x23' },
        layoutData,
        context,
      },
      {
        fetch: modules.x24.fn,
        rendering: { uid: 'x24', componentName: 'x24' },
        layoutData,
        context,
      },
    ]);
  });

  it('execRequests', async () => {
    const requests: ComponentPropsRequest<CustomContext>[] = [
      req(11, 'x1'),
      req(22, 'x2'),
      req(33, 'x3'),
    ];

    const result = await service.execRequests(requests);

    expect(result).to.deep.equal({
      x1: 11,
      x2: 22,
      x3: 33,
    });

    expect(requests[0].fetch).to.be.called.with.exactly(
      {
        uid: 'x1',
        componentName: 'x1',
      },
      layoutData,
      context
    );

    expect(requests[1].fetch).to.be.called.with.exactly(
      {
        uid: 'x2',
        componentName: 'x2',
      },
      layoutData,
      context
    );

    expect(requests[2].fetch).to.be.called.with.exactly(
      {
        uid: 'x3',
        componentName: 'x3',
      },
      layoutData,
      context
    );
  });

  describe('flatRenderings', () => {
    it('should collect renderings from several placeholders', () => {
      const placeholders: PlaceholdersData = {
        x1: [rendering('1'), rendering('2')],
        x2: [rendering('11'), rendering('22')],
        x3: [rendering('111'), rendering('222'), rendering('333')],
      };

      const result = service.flatRenderings(placeholders);

      expect(result).to.deep.equal([
        rendering('1'),
        rendering('2'),
        rendering('11'),
        rendering('22'),
        rendering('111'),
        rendering('222'),
        rendering('333'),
      ]);
    });

    it('should handle empty placeholders data', () => {
      const placeholders: PlaceholdersData = {};

      const result = service.flatRenderings(placeholders);

      expect(result).to.deep.equal([]);
    });
  });
});
