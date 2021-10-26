import { expect } from 'chai';
import { ItemDefinition, ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
import { DisconnectedSitemapService } from './disconnected-sitemap-service';

describe('DisconnectedSitemapService', () => {
  const item = ({
    name,
    children,
    renderings = [],
  }: {
    name: string;
    children?: ItemDefinition[];
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
              }),
              item({
                name: 'x12',
                renderings: ['r1'],
                children: [
                  item({
                    name: 'x41',
                    renderings: ['r5'],
                  }),
                  item({
                    name: 'x42',
                    renderings: ['r1'],
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
                      }),
                      item({
                        name: 'x32',
                        renderings: ['r5'],
                      }),
                      item({
                        name: 'x33',
                        renderings: [],
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

  it('should generate sitemap', () => {
    const manifest = genManifest('da-DK');
    const service = new DisconnectedSitemapService(manifest);

    const sitemap = service.fetchExportSitemap();

    expect(sitemap).to.deep.equal([
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
});
