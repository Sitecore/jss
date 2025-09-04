/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLSiteInfoService, GraphQLSiteInfoResult } from './graphql-siteinfo-service';
import { GraphQLRequestClient } from '../graphql';
import debugApi from 'debug';
import debug from '../debug';

use(spies);

describe('GraphQLSiteInfoService', () => {
  let debugNamespaces: string;
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });

  const site = ({
    name,
    hostName,
    language,
  }: {
    name: string;
    hostName: string;
    language: string;
  }): GraphQLSiteInfoResult => ({
    name: name,
    hostName: hostName,
    language: language,
  });

  const nonEmptyResponse = ({
    count = 1,
    sites = [],
  }: {
    count?: number;
    sites?: GraphQLSiteInfoResult[];
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
  it('should return empty array when empty result received', async () => {
    nock(endpoint)
      .post('/')
      .reply(200, emptyResponse);
    const service = new GraphQLSiteInfoService({ clientFactory });
    const result = await service.fetchSiteInfo();
    expect(result).to.deep.equal([]);
  });

  it('should use caching by default', async () => {
    mockSiteInfoRequest(nonEmptyResponse());
    const service = new GraphQLSiteInfoService({ clientFactory });
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
      clientFactory,
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
    const service = new GraphQLSiteInfoService({ clientFactory });
    const result = await service.fetchSiteInfo();
    expect(result).to.deep.equal([]);
    expect(debug.multisite.log, 'log debug message').to.be.called.once;
    expect(nock.isDone(), 'skip request').to.be.false;
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
    const service = new GraphQLSiteInfoService({ clientFactory });
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
