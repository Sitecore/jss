/* eslint-disable no-unused-expressions */
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { expect } from 'chai';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { ComponentModule, Module } from '../sharedTypes/component-module';
import {
  GetServerSideComponentProps,
  GetStaticComponentProps,
} from '../sharedTypes/component-props';
import { ComponentPropsService } from './component-props-service';
import { spy } from 'sinon';

describe('ComponentPropsService', () => {
  const service = new ComponentPropsService();

  const rendering = (componentUid?: string, componentName?: string): ComponentRendering => ({
    uid: componentUid,
    componentName: componentName || `name${componentUid}`,
  });

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
                  rendering(undefined, 'MyCustomComponent'),
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

  const fetchFn = (expectedData: unknown, err?: string | { message: string }) =>
    spy(() => (err ? Promise.reject(err) : Promise.resolve(expectedData)));

  it('fetchServerSideComponentProps', async () => {
    const ssrModules: {
      [componentName: string]: { getServerSideProps: GetServerSideComponentProps };
    } = {
      namex11: {
        getServerSideProps: fetchFn('x11SSRData'),
      },
      namex14: {
        getServerSideProps: fetchFn('x14SSRData', 'whoops'),
      },
      MyCustomComponent: {
        getServerSideProps: fetchFn('myCustomComponentSSRData'),
      },
      namex24: {
        getServerSideProps: fetchFn('x24SSRData'),
      },
    };

    const ssrContext = {
      req: {} as IncomingMessage & { cookies: { [key: string]: string } },
      res: {} as ServerResponse,
      query: {} as ParsedUrlQuery,
      resolvedUrl: '',
    };

    const ssrComponentModule = (componentName: string) => ssrModules[componentName];

    const result = await service.fetchServerSideComponentProps({
      componentModule: ssrComponentModule as ComponentModule,
      context: ssrContext,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11SSRData',
      x14: {
        error: 'Error during preload data for component x14: whoops',
      },
      x16: 'myCustomComponentSSRData',
      x161: 'myCustomComponentSSRData',
      x23: 'myCustomComponentSSRData',
      x24: 'x24SSRData',
    });
  });

  it('fetchServerSideComponentProps using lazy loading module', async () => {
    const ssrModules: {
      [componentName: string]: { getServerSideProps: GetServerSideComponentProps };
    } = {
      namex11: {
        getServerSideProps: fetchFn('x11SSRData'),
      },
      namex14: {
        getServerSideProps: fetchFn('x14SSRData', 'whoops'),
      },
      MyCustomComponent: {
        getServerSideProps: fetchFn('myCustomComponentSSRData'),
      },
      namex24: {
        getServerSideProps: fetchFn('x24SSRData'),
      },
    };

    const ssrContext = {
      req: {} as IncomingMessage & { cookies: { [key: string]: string } },
      res: {} as ServerResponse,
      query: {} as ParsedUrlQuery,
      resolvedUrl: '',
    };

    const ssrComponentModule = (componentName: string) => {
      return new Promise<Module>((res) => {
        setTimeout(() => {
          res(ssrModules[componentName] as Module);
        }, 200);
      });
    };

    const result = await service.fetchServerSideComponentProps({
      componentModule: ssrComponentModule,
      context: ssrContext,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11SSRData',
      x14: {
        error: 'Error during preload data for component x14: whoops',
      },
      x16: 'myCustomComponentSSRData',
      x161: 'myCustomComponentSSRData',
      x23: 'myCustomComponentSSRData',
      x24: 'x24SSRData',
    });
  });

  it('fetchStaticComponentProps using lazy loading module', async () => {
    const ssgModules: { [componentName: string]: { getStaticProps: GetStaticComponentProps } } = {
      namex11: {
        getStaticProps: fetchFn('x11StaticData'),
      },
      namex14: {
        getStaticProps: fetchFn('x14StaticData', 'whoops'),
      },
      MyCustomComponent: {
        getStaticProps: fetchFn('myCustomComponentStaticData'),
      },
      namex24: {
        getStaticProps: fetchFn('x24StaticData'),
      },
    };

    const ssgComponentModule = (componentName: string) => {
      return new Promise<{ getStaticProps: GetStaticComponentProps }>((res) => {
        setTimeout(() => {
          res(ssgModules[componentName]);
        }, 200);
      });
    };

    const result = await service.fetchStaticComponentProps({
      componentModule: ssgComponentModule as ComponentModule,
      context,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11StaticData',
      x14: {
        error: 'Error during preload data for component x14: whoops',
      },
      x16: 'myCustomComponentStaticData',
      x161: 'myCustomComponentStaticData',
      x23: 'myCustomComponentStaticData',
      x24: 'x24StaticData',
    });
  });

  it('fetchStaticComponentProps', async () => {
    const ssgModules: { [componentName: string]: { getStaticProps: GetStaticComponentProps } } = {
      namex11: {
        getStaticProps: fetchFn('x11StaticData'),
      },
      namex14: {
        getStaticProps: fetchFn('x14StaticData', 'whoops'),
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
      componentModule: ssgComponentModule as ComponentModule,
      context,
      layoutData,
    });

    expect(result).to.deep.equal({
      x11: 'x11StaticData',
      x14: {
        error: 'Error during preload data for component x14: whoops',
      },
      x16: 'myCustomComponentStaticData',
      x161: 'myCustomComponentStaticData',
      x23: 'myCustomComponentStaticData',
      x24: 'x24StaticData',
    });
  });
});
