/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSiteInfoService, GraphQLSiteInfoResult } from './graphql-siteinfo-service';
import { GraphQLRequestClient, PageInfo } from '../graphql';

describe('GraphQLSiteInfoService', () => {
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

  afterEach(() => {
    nock.cleanAll();
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
});
