/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { DisconnectedSitemapService } from './disconnected-sitemap-service';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';

use(spies);

describe.only('DisconnectedSitemapService', () => {
  const mockFetcher = (data?: any, error?: any) => {
    const fetcher = {} as AxiosDataFetcher;

    if (error) {
      fetcher.get = spy<any>(() => {
        return Promise.reject(error);
      });

      return fetcher;
    }

    fetcher.get = spy<any>(() => {
      return Promise.resolve({ data });
    });

    return fetcher;
  };

  it('should fetch sitemap', async () => {
    const fetcher = mockFetcher([
      {
        params: {
          path: ['styleguide'],
        },
      },
      {
        params: {
          path: ['graphql'],
        },
      },
    ]);

    const service = new DisconnectedSitemapService({
      endpoint: 'http://test/sitemap',
      dataFetcher: fetcher,
    });

    const sitemap = await service.fetchExportSitemap('en');

    expect(sitemap).to.deep.equal([
      {
        params: {
          path: ['styleguide'],
        },
      },
      {
        params: {
          path: ['graphql'],
        },
      },
    ]);

    expect(fetcher.get).to.have.been.called.once;
    expect(fetcher.get).to.have.been.called.with.exactly('http://test/sitemap', {
      params: { sc_lang: 'en' },
    });
  });

  it('should handle error', async () => {
    const fetcher = mockFetcher(
      [
        {
          params: {
            path: ['graphql'],
          },
        },
      ],
      'error happens'
    );

    const service = new DisconnectedSitemapService({
      endpoint: 'http://test1/sitemap',
      dataFetcher: fetcher,
    });

    const sitemap = await service.fetchExportSitemap('en');

    expect(sitemap).deep.equal([]);

    expect(fetcher.get).to.have.been.called.once;
    expect(fetcher.get).to.have.been.called.with.exactly('http://test1/sitemap', {
      params: { sc_lang: 'en' },
    });
  });
});
