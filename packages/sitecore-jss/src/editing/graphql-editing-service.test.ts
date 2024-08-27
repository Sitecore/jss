/* eslint-disable no-unused-expressions */
import { expect, use, spy } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import spies from 'chai-spies';
import { GraphQLRequestClient } from '../graphql-request-client';
import {
  GraphQLEditingService,
  GraphQLEditingServiceConfig,
  query,
  dictionaryQuery,
} from './graphql-editing-service';
import {
  mockEditingServiceDictionaryResponse,
  mockEditingServiceResponse,
} from '../test-data/mockEditingServiceResponse';
import { EditMode } from '../layout';
import { LayoutKind } from './models';
import debug from '../debug';

use(spies);

describe('GraphQLEditingService', () => {
  const hostname = 'http://site';
  const endpointPath = '/?sitecoreContextId=context-id';
  const siteName = 'site-name';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint: hostname + endpointPath,
  });
  const language = 'en';
  const version = 'latest';
  const itemId = '{3E0A2F20-B325-5E57-881F-FF6648D08575}';

  const editingData = mockEditingServiceResponse();

  const layoutDataResponse = {
    sitecore: {
      context: {
        editMode: EditMode.Metadata,
        pageEditing: true,
        language: 'en',
      },
      route: {
        name: 'Sample',
        placeholders: {
          main: [
            {
              componentName: 'Sample',
              fields: {
                title: {
                  value: 'Hello world!',
                },
              },
            },
          ],
        },
      },
    },
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch editing data', async () => {
    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(200, editingData);

    const clientFactorySpy = sinon.spy(clientFactory);

    const service = new GraphQLEditingService({
      clientFactory: clientFactorySpy,
    });

    spy.on(clientFactorySpy.returnValues[0], 'request');

    const result = await service.fetchEditingData({
      language,
      version,
      itemId,
      siteName,
    });

    expect(clientFactorySpy.calledOnce).to.be.true;
    expect(
      clientFactorySpy.calledWith({
        debugger: debug.editing,
        headers: {
          sc_editMode: 'true',
        },
      })
    ).to.be.true;
    expect(clientFactorySpy.returnValues[0].request).to.be.called.exactly(1);
    expect(clientFactorySpy.returnValues[0].request).to.be.called.with(
      query,
      {
        language,
        version,
        itemId,
        siteName,
      },
      {
        sc_layoutKind: 'final',
      }
    );

    expect(result).to.deep.equal({
      layoutData: layoutDataResponse,
      dictionary: {
        foo: 'foo-phrase',
        bar: 'bar-phrase',
      },
    });

    spy.restore(clientFactorySpy);
  });

  it('should return empty dictionary and layout', async () => {
    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(200, {
        data: {
          item: null,
          site: {
            siteInfo: {
              dictionary: null,
            },
          },
        },
      });

    const clientFactorySpy = sinon.spy(clientFactory);

    const service = new GraphQLEditingService({
      clientFactory: clientFactorySpy,
    });

    spy.on(clientFactorySpy.returnValues[0], 'request');

    const result = await service.fetchEditingData({
      language,
      version,
      itemId,
      siteName,
      layoutKind: LayoutKind.Shared,
    });

    expect(clientFactorySpy.calledOnce).to.be.true;
    expect(
      clientFactorySpy.calledWith({
        debugger: debug.editing,
        headers: {
          sc_editMode: 'true',
        },
      })
    ).to.be.true;
    expect(clientFactorySpy.returnValues[0].request).to.be.called.exactly(1);
    expect(clientFactorySpy.returnValues[0].request).to.be.called.with(
      query,
      {
        language,
        version,
        itemId,
        siteName,
      },
      {
        sc_layoutKind: 'shared',
      }
    );

    expect(result).to.deep.equal({
      layoutData: {
        sitecore: {
          context: { pageEditing: true, language, editMode: EditMode.Metadata },
          route: null,
        },
      },
      dictionary: {},
    });

    spy.restore(clientFactorySpy);
  });

  it('should fetch editing data with missing optional params', async () => {
    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(200, editingData);

    const clientFactorySpy = sinon.spy(clientFactory);

    const service = new GraphQLEditingService({
      clientFactory: clientFactorySpy,
    });

    spy.on(clientFactorySpy.returnValues[0], 'request');

    const result = await service.fetchEditingData({
      language,
      itemId,
      siteName,
    });

    expect(clientFactorySpy.calledOnce).to.be.true;
    expect(
      clientFactorySpy.calledWith({
        debugger: debug.editing,
        headers: {
          sc_editMode: 'true',
        },
      })
    ).to.be.true;
    expect(clientFactorySpy.returnValues[0].request).to.be.called.exactly(1);
    expect(clientFactorySpy.returnValues[0].request).to.be.called.with(query, {
      language,
      itemId,
      siteName,
      version: undefined,
    });

    expect(result).to.deep.equal({
      layoutData: layoutDataResponse,
      dictionary: {
        foo: 'foo-phrase',
        bar: 'bar-phrase',
      },
    });

    spy.restore(clientFactorySpy);
  });

  it('should fetch editing data when dicionary has multiple pages', async () => {
    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(200, mockEditingServiceResponse(true));

    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /DictionaryQuery/gi)
      .reply(200, mockEditingServiceDictionaryResponse.pageOne);

    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /DictionaryQuery/gi)
      .reply(200, mockEditingServiceDictionaryResponse.pageTwo);

    const clientFactorySpy = sinon.spy(clientFactory);

    const service = new GraphQLEditingService({
      clientFactory: clientFactorySpy,
    });

    spy.on(clientFactorySpy.returnValues[0], 'request');

    const result = await service.fetchEditingData({
      language,
      version,
      itemId,
      siteName,
    });

    expect(clientFactorySpy.called).to.be.true;
    expect(
      clientFactorySpy.calledWith({
        debugger: debug.editing,
        headers: {
          sc_editMode: 'true',
        },
      })
    ).to.be.true;

    expect(clientFactorySpy.returnValues[0].request).to.be.called.exactly(3);
    expect(clientFactorySpy.returnValues[0].request).to.be.called.with(query, {
      language,
      version,
      itemId,
      siteName,
    });

    expect(clientFactorySpy.returnValues[0].request)
      .on.nth(2)
      .to.be.called.with(dictionaryQuery, {
        language,
        siteName,
        after: 'cursor',
      });

    expect(clientFactorySpy.returnValues[0].request)
      .on.nth(3)
      .to.be.called.with(dictionaryQuery, {
        language,
        siteName,
        after: 'cursor-one',
      });

    expect(result).to.deep.equal({
      layoutData: layoutDataResponse,
      dictionary: {
        foo: 'foo-phrase',
        bar: 'bar-phrase',
        'foo-one': 'foo-one-phrase',
        'bar-one': 'bar-one-phrase',
        'foo-two': 'foo-two-phrase',
        'bar-two': 'bar-two-phrase',
      },
    });

    spy.restore(clientFactorySpy);
  });

  it('should return empty dictionary when dictionary is not provided', async () => {
    const editingData = mockEditingServiceResponse();

    (editingData.data.site.siteInfo as any) = null;

    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(200, editingData);

    const clientFactorySpy = sinon.spy(clientFactory);

    const service = new GraphQLEditingService({
      clientFactory: clientFactorySpy,
    });

    spy.on(clientFactorySpy.returnValues[0], 'request');

    const result = await service.fetchEditingData({
      language,
      version,
      itemId,
      siteName,
    });

    expect(clientFactorySpy.calledOnce).to.be.true;
    expect(
      clientFactorySpy.calledWith({
        debugger: debug.editing,
        headers: {
          sc_editMode: 'true',
        },
      })
    ).to.be.true;
    expect(clientFactorySpy.returnValues[0].request).to.be.called.exactly(1);
    expect(clientFactorySpy.returnValues[0].request).to.be.called.with(query, {
      language,
      version,
      itemId,
      siteName,
    });

    expect(result).to.deep.equal({
      layoutData: layoutDataResponse,
      dictionary: {},
    });

    spy.restore(clientFactorySpy);
  });

  it('should throw an error when client factory is not provided', async () => {
    try {
      const service = new GraphQLEditingService({} as GraphQLEditingServiceConfig);

      await service.fetchEditingData({
        language,
        version,
        itemId,
        siteName,
      });
    } catch (error) {
      expect(error.message).to.equal(
        'clientFactory needs to be provided when initializing GraphQL client.'
      );
    }
  });

  it('should throw an error when fetching editing data', async () => {
    nock(hostname, { reqheaders: { sc_editMode: 'true' } })
      .post(endpointPath, /EditingQuery/gi)
      .reply(500, 'Internal server error');

    const service = new GraphQLEditingService({
      clientFactory,
    });

    try {
      await service.fetchEditingData({
        language,
        version,
        itemId,
        siteName,
      });
    } catch (error) {
      expect(error.response.error).to.equal('Internal server error');
    }
  });

  it('should throw an error when siteName is not provided', async () => {
    const service = new GraphQLEditingService({
      clientFactory,
    });

    try {
      await service.fetchEditingData({
        language,
        version,
        itemId,
        siteName: '',
      });
    } catch (error) {
      expect(error.message).to.equal('The site name must be a non-empty string');
    }
  });

  it('should throw an error when language is not provided', async () => {
    const service = new GraphQLEditingService({
      clientFactory,
    });

    try {
      await service.fetchEditingData({
        language: '',
        version,
        itemId,
        siteName,
      });
    } catch (error) {
      expect(error.message).to.equal('The language must be a non-empty string');
    }
  });
});
