/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { spy } from 'sinon';
import { Request, Response } from 'express';
import { ItemDefinition, ManifestInstance } from '@sitecore-jss/sitecore-jss-manifest';
import { createDisconnectedSitemapService } from './sitemap-service';

describe('createDisconnectedSitemapService', () => {
  const item = ({
    name,
    children = [],
    renderings = [],
  }: {
    name: string;
    children: ItemDefinition[];
    renderings: string[];
  }) =>
    (({
      children,
      name,
      layout: {
        renderings,
      },
    } as unknown) as ItemDefinition);

  const genManifest = (language: string) =>
    ({
      language,
      items: {
        routes: [
          item({
            name: 'x0',
            renderings: ['r0'],
            children: [
              item({
                name: 'x11',
                renderings: ['r1'],
                children: [],
              }),
              item({
                name: 'x12',
                renderings: ['r1'],
                children: [
                  item({
                    name: 'x41',
                    renderings: ['r5'],
                    children: [],
                  }),
                  item({
                    name: 'x42',
                    renderings: ['r1'],
                    children: [],
                  }),
                ],
              }),
              item({
                name: 'x13',
                renderings: ['r2'],
                children: [
                  item({
                    name: 'x21',
                    renderings: ['r3'],
                    children: [
                      item({
                        name: 'x31',
                        renderings: ['r4'],
                        children: [],
                      }),
                      item({
                        name: 'x32',
                        renderings: ['r5'],
                        children: [],
                      }),
                      item({
                        name: 'x33',
                        renderings: [],
                        children: [],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    } as ManifestInstance);

  it('should generate sitemap', async () => {
    const service = createDisconnectedSitemapService({
      manifest: genManifest('da-DK'),
    });

    const json = spy((sitemap: unknown) => sitemap);

    const status = spy((_code: number) => ({
      json,
    }));

    const response = ({
      status,
    } as unknown) as Response;

    const request = ({
      query: { sc_lang: 'da-DK' },
    } as unknown) as Request;

    await service.middleware(request, response);

    expect(status.calledOnce).to.equal(true);
    expect(status.calledWithExactly(200)).to.equal(true);
    expect(json.calledOnce).to.equal(true);
    expect(json.args[0][0]).to.deep.equal([
      {
        params: {
          path: [''],
        },
      },
      {
        params: {
          path: ['x11'],
        },
      },
      {
        params: {
          path: ['x12'],
        },
      },
      {
        params: {
          path: ['x12', 'x41'],
        },
      },
      {
        params: {
          path: ['x12', 'x42'],
        },
      },
      {
        params: {
          path: ['x13'],
        },
      },
      {
        params: {
          path: ['x13', 'x21'],
        },
      },
      {
        params: {
          path: ['x13', 'x21', 'x31'],
        },
      },
      {
        params: {
          path: ['x13', 'x21', 'x32'],
        },
      },
    ]);
  });

  it('should generate sitemap with different manifest language', async () => {
    const getManifest = spy((language) => Promise.resolve(genManifest(language)));

    const service = createDisconnectedSitemapService({
      manifest: genManifest('da-DK'),
      getManifest,
    });

    const json = spy((sitemap: unknown) => sitemap);

    const status = spy((_code: number) => ({
      json,
    }));

    const response = ({
      status,
    } as unknown) as Response;

    const request = ({
      query: { sc_lang: 'en' },
    } as unknown) as Request;

    await service.middleware(request, response);

    expect(getManifest.calledWithExactly('en')).to.equal(true);

    expect(status.calledOnce).to.equal(true);
    expect(status.calledWithExactly(200)).to.equal(true);
    expect(json.calledOnce).to.equal(true);
    expect(json.args[0][0]).to.deep.equal([
      {
        params: {
          path: [''],
        },
      },
      {
        params: {
          path: ['x11'],
        },
      },
      {
        params: {
          path: ['x12'],
        },
      },
      {
        params: {
          path: ['x12', 'x41'],
        },
      },
      {
        params: {
          path: ['x12', 'x42'],
        },
      },
      {
        params: {
          path: ['x13'],
        },
      },
      {
        params: {
          path: ['x13', 'x21'],
        },
      },
      {
        params: {
          path: ['x13', 'x21', 'x31'],
        },
      },
      {
        params: {
          path: ['x13', 'x21', 'x32'],
        },
      },
    ]);
  });

  it('should throw 500 error when generate sitemap with different manifest language', async () => {
    const getManifest = spy((language) =>
      Promise.reject('Error happened... in language ' + language)
    );

    const service = createDisconnectedSitemapService({
      manifest: genManifest('da-DK'),
      getManifest,
    });

    const sendStatus = spy((code: number) => code);

    const json = spy((sitemap: unknown) => sitemap);

    const status = spy((_code: number) => ({
      json,
    }));

    const response = ({
      status,
      sendStatus,
    } as unknown) as Response;

    const request = ({
      query: { sc_lang: 'en' },
    } as unknown) as Request;

    await service.middleware(request, response);

    expect(getManifest.calledWithExactly('en')).to.equal(true);
    expect(sendStatus.calledWithExactly(500)).to.equal(true);
    expect(status.called).to.equal(false);
    expect(json.called).to.equal(false);
  });

  it('should throw 404 error when generate sitemap with different manifest language', async () => {
    const service = createDisconnectedSitemapService({
      manifest: genManifest('da-DK'),
      getManifest: undefined,
    });

    const sendStatus = spy((code: number) => code);

    const json = spy((sitemap: unknown) => sitemap);

    const status = spy((_code: number) => ({
      json,
    }));

    const response = ({
      status,
      sendStatus,
    } as unknown) as Response;

    const request = ({
      query: { sc_lang: 'en' },
    } as unknown) as Request;

    await service.middleware(request, response);

    expect(sendStatus.calledWithExactly(404)).to.equal(true);
    expect(status.called).to.equal(false);
    expect(json.called).to.equal(false);
  });
});
