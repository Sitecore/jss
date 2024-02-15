/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import {
  GraphQLSiteInfoService,
  GraphQLSiteInfoResult,
  GraphQLXmCloudSiteInfoResult,
} from './graphql-siteinfo-service';
import { GraphQLRequestClient, PageInfo } from '../graphql';
import debugApi from 'debug';
import debug from '../debug';

use(spies);

describe('GraphQLSiteInfoService', () => {
  let debugNamespaces: string;
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';

  const site = ({
    name,
    hostName,
    language,
  }: {
    name: string;
    hostName: string;
    language: string;
  }): GraphQLSiteInfoResult => ({
    name: { value: name },
    hostName: { value: hostName },
    language: { value: language },
  });

  const nonEmptyResponse = ({
    count = 1,
    start = 0,
    pageInfo = { hasNext: false, endCursor: '' },
    sites = [],
  }: {
    count?: number;
    start?: number;
    pageInfo?: PageInfo;
    sites?: GraphQLSiteInfoResult[];
  } = {}) => ({
    data: {
      search: {
        pageInfo,
        results: [
          ...[...Array(count).keys()].map((n) =>
            site({
              name: `site ${start + n}`,
              hostName: 'restricted.gov',
              language: 'en',
            })
          ),
          ...sites,
        ],
      },
    },
  });

  const emptyResponse = {
    data: {
      search: {
        pageInfo: {},
        results: [],
      },
    },
  };

  before(() => {
    debugNamespaces = debugApi.disable();
    debugApi.enable(debug.multisite.namespace);
  });

  beforeEach(() => {
    spy.on(debug.multisite, 'log', () => true);
  });

  afterEach(() => {
    nock.cleanAll();
    spy.restore(debug.multisite);
    delete process.env.SITECORE;
  });

  after(() => {
    debugApi.enable(debugNamespaces);
  });

  const mockSiteInfoRequest = (response: { [key: string]: unknown }) => {
    nock(endpoint)
      .post('/')
      .reply(200, response);
  };

  it('should return correct result', async () => {
    mockSiteInfoRequest(
      nonEmptyResponse({
        sites: [
          site({
            name: 'public 0',
            hostName: 'pr.showercurtains.org',
            language: '',
          }),
        ],
      })
    );
    const service = new GraphQLSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
    const result = await service.fetchSiteInfo();
    expect(result).to.be.deep.equal([
      {
        name: 'site 0',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'public 0',
        hostName: 'pr.showercurtains.org',
        language: '',
      },
    ]);
  });

  it('should return correct result using clientFactory', async () => {
    mockSiteInfoRequest(
      nonEmptyResponse({
        sites: [
          site({
            name: 'public 0',
            hostName: 'pr.showercurtains.org',
            language: '',
          }),
        ],
      })
    );
    const clientFactory = GraphQLRequestClient.createClientFactory({
      endpoint,
      apiKey,
    });
    const service = new GraphQLSiteInfoService({ clientFactory });
    const result = await service.fetchSiteInfo();
    expect(result).to.be.deep.equal([
      {
        name: 'site 0',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'public 0',
        hostName: 'pr.showercurtains.org',
        language: '',
      },
    ]);
  });

  it('should return correct result using custom pageSize', async () => {
    mockSiteInfoRequest(nonEmptyResponse({ count: 2, pageInfo: { hasNext: true, endCursor: '' } }));
    mockSiteInfoRequest(
      nonEmptyResponse({ count: 2, start: 2, pageInfo: { hasNext: true, endCursor: '' } })
    );
    mockSiteInfoRequest(
      nonEmptyResponse({ count: 2, start: 4, pageInfo: { hasNext: false, endCursor: '' } })
    );

    const service = new GraphQLSiteInfoService({ apiKey: apiKey, endpoint: endpoint, pageSize: 2 });
    const result = await service.fetchSiteInfo();
    expect(result).to.be.deep.equal([
      {
        name: 'site 0',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'site 1',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'site 2',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'site 3',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'site 4',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'site 5',
        hostName: 'restricted.gov',
        language: 'en',
      },
    ]);
  });

  it('should return empty array when empty result received', async () => {
    nock(endpoint)
      .post('/')
      .reply(200, emptyResponse);
    const service = new GraphQLSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
    const result = await service.fetchSiteInfo();
    expect(result).to.deep.equal([]);
  });

  it('should use caching by default', async () => {
    mockSiteInfoRequest(nonEmptyResponse());
    const service = new GraphQLSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
    const result = await service.fetchSiteInfo();
    nock.cleanAll();
    nock(endpoint)
      .post('/')
      .reply(200, emptyResponse);
    const resultCached = await service.fetchSiteInfo();
    expect(resultCached).to.deep.equal(result);
  });

  it('should be possible to disable cache', async () => {
    mockSiteInfoRequest(
      nonEmptyResponse({
        sites: [
          site({
            name: 'public 0',
            hostName: 'pr.showercurtains.org',
            language: '',
          }),
        ],
      })
    );
    const service = new GraphQLSiteInfoService({
      apiKey: apiKey,
      endpoint: endpoint,
      cacheEnabled: false,
    });
    const result = await service.fetchSiteInfo();
    expect(result).to.be.deep.equal([
      {
        name: 'site 0',
        hostName: 'restricted.gov',
        language: 'en',
      },
      {
        name: 'public 0',
        hostName: 'pr.showercurtains.org',
        language: '',
      },
    ]);
    nock.cleanAll();
    nock(endpoint)
      .post('/')
      .reply(200, emptyResponse);
    const resultCached = await service.fetchSiteInfo();
    expect(resultCached).to.deep.equal([]);
  });

  it('should skip on XM Cloud', async () => {
    process.env.SITECORE = 'true';
    nock(endpoint)
      .post('/')
      .reply(200, emptyResponse);
    const service = new GraphQLSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
    const result = await service.fetchSiteInfo();
    expect(result).to.deep.equal([]);
    expect(debug.multisite.log, 'log debug message').to.be.called.once;
    expect(nock.isDone(), 'skip request').to.be.false;
  });

  describe('Fetch with site query in XM Cloud', () => {
    const site = ({
      name,
      hostName,
      language,
    }: {
      name: string;
      hostName: string;
      language: string;
    }): GraphQLXmCloudSiteInfoResult => ({
      name,
      hostName,
      language,
    });

    const nonEmptyResponse = ({
      count = 1,
      sites = [],
    }: {
      count?: number;
      sites?: GraphQLXmCloudSiteInfoResult[];
    } = {}) => ({
      data: {
        site: {
          siteInfoCollection: [
            ...[...Array(count).keys()].map((n) =>
              site({
                name: `site ${n}`,
                hostName: 'restricted.gov',
                language: 'en',
              })
            ),
            ...sites,
          ],
        },
      },
    });

    const emptyResponse = {
      data: {
        site: {
          siteInfoCollection: [],
        },
      },
    };

    const getXmCLoudSiteInfoService = (initProps: { [key: string]: unknown }) => {
      return new GraphQLSiteInfoService({ xmCloud: true, ...initProps });
    };

    it('should return correct result', async () => {
      mockSiteInfoRequest(
        nonEmptyResponse({
          sites: [
            site({
              name: 'public 0',
              hostName: 'pr.showercurtains.org',
              language: '',
            }),
          ],
        })
      );
      const service = getXmCLoudSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
      const result = await service.fetchSiteInfo();
      expect(result).to.be.deep.equal([
        {
          name: 'site 0',
          hostName: 'restricted.gov',
          language: 'en',
        },
        {
          name: 'public 0',
          hostName: 'pr.showercurtains.org',
          language: '',
        },
      ]);
    });

    it('should return correct result using clientFactory', async () => {
      mockSiteInfoRequest(
        nonEmptyResponse({
          sites: [
            site({
              name: 'public 0',
              hostName: 'pr.showercurtains.org',
              language: '',
            }),
          ],
        })
      );
      const clientFactory = GraphQLRequestClient.createClientFactory({
        endpoint,
        apiKey,
      });
      const service = getXmCLoudSiteInfoService({ clientFactory });
      const result = await service.fetchSiteInfo();
      expect(result).to.be.deep.equal([
        {
          name: 'site 0',
          hostName: 'restricted.gov',
          language: 'en',
        },
        {
          name: 'public 0',
          hostName: 'pr.showercurtains.org',
          language: '',
        },
      ]);
    });

    it('should return empty array when empty result received', async () => {
      nock(endpoint)
        .post('/')
        .reply(200, emptyResponse);
      const service = getXmCLoudSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
      const result = await service.fetchSiteInfo();
      expect(result).to.deep.equal([]);
    });

    it('should filter out default website', async () => {
      mockSiteInfoRequest(
        nonEmptyResponse({
          sites: [
            site({
              name: 'website',
              hostName: 'notheadless.org',
              language: '',
            }),
          ],
        })
      );
      const service = getXmCLoudSiteInfoService({ apiKey: apiKey, endpoint: endpoint });
      const result = await service.fetchSiteInfo();
      expect(result).to.be.deep.equal([
        {
          name: 'site 0',
          hostName: 'restricted.gov',
          language: 'en',
        },
      ]);
    });
  });
});
