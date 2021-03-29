/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import nock from 'nock';
import { GraphQLDictionaryService } from './graphql-dictionary-service';
import siteRootQueryResponse from './mockSiteRootQueryResponse.json';
import dictionaryQueryResponse from './mockDictionaryQueryResponse.json';

describe('GraphQLDictionaryService', () => {
  const endpoint = 'http://site';
  const siteName = 'site-name';

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch app root', async () => {
    nock(endpoint)
      .post('/', /GetSiteRoot/gi)
      .reply(200, siteRootQueryResponse);

    nock(endpoint)
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({ endpoint, siteName, cacheEnabled: false });
    await service.fetchDictionaryData('en');
    expect(service.options.rootItemId).to.equal('GUIDGUIDGUID');
  });

  it('should fetch dictionary phrases', async () => {
    nock(endpoint)
      .post('/', /GetSiteRoot/gi)
      .reply(200, siteRootQueryResponse);

    nock(endpoint)
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({ endpoint, siteName, cacheEnabled: false });
    const result = await service.fetchDictionaryData('en');
    expect(result.foo).to.equal('foo');
    expect(result.bar).to.equal('bar');
  });

  it('should throw error if no app root found', async () => {
    nock(endpoint)
      .post('/', /GetSiteRoot/gi)
      .reply(200, {
        data: {
          layout: {
            homePage: {
              rootItem: [],
            },
          },
        },
      });

    nock(endpoint)
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({ endpoint, siteName, cacheEnabled: false });
    await service.fetchDictionaryData('en').catch((error) => {
      expect(error.message).to.equal('Error fetching Sitecore site root item');
    });
  });

  it('should use cache', async () => {
    nock(endpoint)
      .post('/', /GetSiteRoot/gi)
      .reply(200, siteRootQueryResponse);

    nock(endpoint)
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({ endpoint, siteName, cacheTimeout: 2 });

    const result1 = await service.fetchDictionaryData('en');
    expect(result1).to.have.all.keys('foo', 'bar');

    const result2 = await service.fetchDictionaryData('en');
    expect(result2).to.have.all.keys('foo', 'bar');
  });

  it('should use a custom rootItemId, if provided', async () => {
    const customRootId = 'cats';
    nock(endpoint)
      .post('/', (body) => body.variables.rootItemId === customRootId)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      siteName,
      cacheEnabled: false,
      rootItemId: customRootId,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use a custom pageSize, if provided', async () => {
    const customPageSize = 2;
    nock(endpoint)
      .post('/', /GetSiteRoot/gi)
      .reply(200, siteRootQueryResponse);

    nock(endpoint)
      .post('/', (body) => body.variables.pageSize === customPageSize)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      siteName,
      cacheEnabled: false,
      pageSize: customPageSize,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use lowercase GUIDs in GraphQL search', async () => {
    const customRootId = '{FOO-BAR-123}';
    nock(endpoint)
      .post('/', (body) => body.variables.rootItemId === '{foo-bar-123}')
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      siteName,
      cacheEnabled: false,
      rootItemId: customRootId,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });
});
