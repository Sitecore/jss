import { ComponentRendering, PlaceholdersData } from '@sitecore-jss/sitecore-jss';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { ComponentPropsService, ComponentPropsRequest } from './component-props-service';

use(spies);

describe('ComponentPropsService', () => {
  const service = new ComponentPropsService();

  const rendering = (componentUid?: string, componentName?: string): ComponentRendering => ({
    uid: componentUid,
    componentName: componentName || `name${componentUid}`,
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
                x14ph: [
                  rendering('x16', 'MyCustomComponent'),
                  rendering('x161', 'MyCustomComponent'),
                  rendering('x17'),
                ],
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
          x22ph: [rendering('x23', 'MyCustomComponent')],
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

  const fetchFn = (expectedData: unknown, err?: string) =>
    spy(() => (err ? Promise.reject(err) : Promise.resolve(expectedData)));

  const req = (
    expectedData: unknown,
    componentUid?: string,
    err?: string
  ): ComponentPropsRequest<CustomContext> => ({
    fetch: fetchFn(expectedData, err),
    layoutData,
    rendering: rendering(componentUid),
    context,
  });

  // In real world: list of imported modules
  const modules: { [componentName: string]: any } = {
    namex11: {
      fn: fetchFn('x11Data'),
    },
    namex14: {
      fn: fetchFn('x14Data'),
    },
    MyCustomComponent: {
      fn: fetchFn('myCustomComponentData'),
    },
    namex24: {
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
      namex11: {
        getServerSideProps: fetchFn('x11SSRData'),
      },
      namex14: {
        getServerSideProps: fetchFn('x14SSRData'),
      },
      MyCustomComponent: {
        getServerSideProps: fetchFn('myCustomComponentSSRData'),
      },
      namex24: {
        getServerSideProps: fetchFn('x24SSRData'),
      },
    };

    const ssrContext = {
      req: {} as IncomingMessage,
      res: {} as ServerResponse,
      query: {} as ParsedUrlQuery,
      resolvedUrl: '',
    };

    const ssrComponentModule = (componentName: string) => ssrModules[componentName];

    const result = await service.fetchServerSideComponentProps({
      componentModule: ssrComponentModule,
      context: ssrContext,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11SSRData',
      x14: 'x14SSRData',
      x16: 'myCustomComponentSSRData',
      x161: 'myCustomComponentSSRData',
      x23: 'myCustomComponentSSRData',
      x24: 'x24SSRData',
    });
  });

  it('fetchStaticComponentProps', async () => {
    const ssgModules: { [componentName: string]: any } = {
      namex11: {
        getStaticProps: fetchFn('x11StaticData'),
      },
      namex14: {
        getStaticProps: fetchFn('x14StaticData'),
      },
      MyCustomComponent: {
        getStaticProps: fetchFn('myCustomComponentStaticData'),
      },
      namex24: {
        getStaticProps: fetchFn('x24StaticData'),
      },
    };

    const ssgComponentModule = (componentName: string) => ssgModules[componentName];

    const result = await service.fetchStaticComponentProps({
      componentModule: ssgComponentModule,
      context,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11StaticData',
      x14: 'x14StaticData',
      x16: 'myCustomComponentStaticData',
      x161: 'myCustomComponentStaticData',
      x23: 'myCustomComponentStaticData',
      x24: 'x24StaticData',
    });
  });

  it('fetchComponentProps', async () => {
    const fetchedData = await service.fetchComponentProps<CustomContext>(
      fetchFunctionFactory,
      layoutData,
      context
    );

    expect(fetchedData).to.deep.equal({
      x11: 'x11Data',
      x14: 'x14Data',
      x16: 'myCustomComponentData',
      x161: 'myCustomComponentData',
      x23: 'myCustomComponentData',
      x24: 'x24Data',
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
        fetch: modules.namex11.fn,
        rendering: { uid: 'x11', componentName: 'namex11' },
        layoutData,
        context,
      },
      {
        fetch: modules.namex14.fn,
        rendering: { uid: 'x14', componentName: 'namex14' },
        layoutData,
        context,
      },
      {
        fetch: modules.MyCustomComponent.fn,
        rendering: { uid: 'x16', componentName: 'MyCustomComponent' },
        layoutData,
        context,
      },
      {
        fetch: modules.MyCustomComponent.fn,
        rendering: { uid: 'x161', componentName: 'MyCustomComponent' },
        layoutData,
        context,
      },
      {
        fetch: modules.MyCustomComponent.fn,
        rendering: { uid: 'x23', componentName: 'MyCustomComponent' },
        layoutData,
        context,
      },
      {
        fetch: modules.namex24.fn,
        rendering: { uid: 'x24', componentName: 'namex24' },
        layoutData,
        context,
      },
    ]);
  });

  describe('execRequests', () => {
    it('success', async () => {
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
          componentName: 'namex1',
        },
        layoutData,
        context
      );

      expect(requests[1].fetch).to.be.called.with.exactly(
        {
          uid: 'x2',
          componentName: 'namex2',
        },
        layoutData,
        context
      );

      expect(requests[2].fetch).to.be.called.with.exactly(
        {
          uid: 'x3',
          componentName: 'namex3',
        },
        layoutData,
        context
      );
    });
  
    it('one of them rejected', async () => {
      const requests: ComponentPropsRequest<CustomContext>[] = [
        req(11, 'x1'),
        req(null, 'x2', 'You do not have access rights to load data for this component'),
        req(33, 'x3'),
      ];

      const result = await service.execRequests(requests);

      expect(result).to.deep.equal({
        x1: 11,
        x2: {
          error: 'You do not have access rights to load data for this component'
        },
        x3: 33,
      });

      expect(requests[0].fetch).to.be.called.with.exactly(
        {
          uid: 'x1',
          componentName: 'namex1',
        },
        layoutData,
        context
      );

      expect(requests[1].fetch).to.be.called.with.exactly(
        {
          uid: 'x2',
          componentName: 'namex2',
        },
        layoutData,
        context
      );

      expect(requests[2].fetch).to.be.called.with.exactly(
        {
          uid: 'x3',
          componentName: 'namex3',
        },
        layoutData,
        context
      );
    })
  
    it('one of them does not have uid', async () => {
      const requests: ComponentPropsRequest<CustomContext>[] = [
        req(11, 'x1'),
        req(22, undefined),
        req(33, 'x3'),
      ];

      const result = await service.execRequests(requests);

      expect(result).to.deep.equal({
        x1: 11,
        x3: 33,
      });

      expect(requests[0].fetch).to.be.called.with.exactly(
        {
          uid: 'x1',
          componentName: 'namex1',
        },
        layoutData,
        context
      );

      expect(requests[1].fetch).not.to.be.called;

      expect(requests[2].fetch).to.be.called.with.exactly(
        {
          uid: 'x3',
          componentName: 'namex3',
        },
        layoutData,
        context
      );
    })
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
