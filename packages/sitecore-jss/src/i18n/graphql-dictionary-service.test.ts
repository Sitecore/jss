import { expect } from 'chai';
import nock from 'nock';
import { SitecoreTemplateId } from '../constants';
import { GraphQLClient, GraphQLRequestClient } from '../graphql-request-client';
import { queryError, GraphQLDictionaryServiceConfig } from './graphql-dictionary-service';
import { GraphQLDictionaryService } from '.';
import dictionaryQueryResponse from '../test-data/mockDictionaryQueryResponse.json';
import appRootQueryResponse from '../test-data/mockAppRootQueryResponse.json';

class TestService extends GraphQLDictionaryService {
  public client: GraphQLClient;
  constructor(options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.client = this.getGraphQLClient();
  }
}

describe('GraphQLDictionaryService', () => {
  const endpoint = 'http://site';
  const siteName = 'site-name';
  const apiKey = 'api-key';
  const rootItemId = '{GUID}';

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch dictionary phrases', async () => {
    nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result.foo).to.equal('foo');
    expect(result.bar).to.equal('bar');
  });

  it('should attempt to fetch the rootItemId, if rootItemId not provided', async () => {
    nock(endpoint)
      .post('/', /AppRootQuery/)
      .reply(200, appRootQueryResponse);

    nock(endpoint)
      .post('/', (body) => body.variables.rootItemId === 'GUIDGUIDGUID')
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      cacheEnabled: false,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
    // eslint-disable-next-line no-unused-expressions
    expect(nock.isDone()).to.be.true;
  });

  it('should use a custom rootItemId, if provided', async () => {
    const customRootId = 'cats';

    nock(endpoint)
      .post('/', (body) => body.variables.rootItemId === customRootId)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      cacheEnabled: false,
      rootItemId: customRootId,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use a jssTemplateId, if provided', async () => {
    const jssAppTemplateId = '{71d608ca-ac9c-4f1c-8e0a-85a6946e30f8}';
    const randomId = '{412286b7-6d4f-4deb-80e9-108ee986c6e9}';

    nock(endpoint)
      .post('/', (body) => body.variables.jssAppTemplateId === jssAppTemplateId)
      .reply(200, {
        data: {
          layout: {
            homePage: {
              rootItem: [
                {
                  id: randomId,
                },
              ],
            },
          },
        },
      });

    nock(endpoint)
      .post('/', (body) => body.variables.rootItemId === randomId)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      cacheEnabled: false,
      jssAppTemplateId,
    });

    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should throw error if could not resolve rootItemId', async () => {
    nock(endpoint)
      .post('/', /AppRootQuery/)
      .reply(200, {
        data: {
          layout: {
            homePage: null,
          },
        },
      });

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      cacheEnabled: false,
    });

    await service.fetchDictionaryData('en').catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(queryError);
    });
  });

  it('should use default pageSize, if pageSize not provided', async () => {
    nock(endpoint)
      .post(
        '/',
        (body) =>
          body.query.indexOf('$pageSize: Int = 10') > 0 && body.variables.pageSize === undefined
      )
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
      pageSize: undefined,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use a custom pageSize, if provided', async () => {
    const customPageSize = 2;

    nock(endpoint)
      .post('/', (body) => body.variables.pageSize === customPageSize)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
      pageSize: customPageSize,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use custom dictionary entry template ID, if provided', async () => {
    const customTemplateId = 'custom-template-id';

    nock(endpoint)
      .post('/', (body) => body.variables.templates === customTemplateId)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
      dictionaryEntryTemplateId: customTemplateId,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use default dictionary entry template ID, if template ID not provided', async () => {
    nock(endpoint)
      .post('/', (body) => body.variables.templates === SitecoreTemplateId.DictionaryEntry)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
    });
    const result = await service.fetchDictionaryData('en');
    expect(result).to.have.all.keys('foo', 'bar');
  });

  it('should use cache', async () => {
    nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
      .post('/', /DictionarySearch/gi)
      .reply(200, dictionaryQueryResponse);

    const service = new GraphQLDictionaryService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: true,
      cacheTimeout: 2,
    });

    const result1 = await service.fetchDictionaryData('en');
    expect(result1).to.have.all.keys('foo', 'bar');

    const result2 = await service.fetchDictionaryData('en');
    expect(result2).to.have.all.keys('foo', 'bar');
  });

  it('should provide a default GraphQL client', () => {
    const service = new TestService({
      endpoint,
      apiKey,
      siteName,
      rootItemId,
      cacheEnabled: false,
    });

    const graphQLClient = service.client as GraphQLClient;
    const graphQLRequestClient = service.client as GraphQLRequestClient;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLClient).to.exist;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLRequestClient).to.exist;
  });
});
