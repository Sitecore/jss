import { RevalidateMiddleware } from './revalidate-middleware';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { NextApiRequest, NextApiResponse } from 'next'; // Replace with the correct import path for your Next.js types
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';
import { GraphQLPersonalizeService } from '@sitecore-jss/sitecore-jss/personalize';

type Query = {
  [key: string]: string;
};
const variantId_1 = 'variantId-1';
const variantId_2 = 'variantId-2';
const id = 'item-id';
const version = '1';
const contentId = `${id}_en_${version}`.toLowerCase();

const mockRequest = (body?: any, query?: Query, method?: string, host?: string) => {
  return ({
    body: body ?? {},
    method: method ?? 'POST',
    query: query ?? {},
    headers: { host: host ?? 'localhost:3000' },
  } as unknown) as NextApiRequest;
};

const mockResponse = () => {
  const res = {} as NextApiResponse;
  res.status = spy(() => {
    return res;
  });
  res.json = spy(() => {
    return res;
  });
  res.end = spy(() => {
    return res;
  });
  res.getHeader = spy(() => {
    return undefined;
  });
  res.setHeader = spy();
  res.setPreviewData = spy(() => {
    return res;
  });
  res.revalidate = spy();
  return res;
};
// webhook req payload
const mockUpdatedPaths = {
  updates: [
    {
      identifier: 'my-site/About',
      entity_definition: 'LayoutData',
      operation: 'Update',
      entity_culture: 'en',
    },
    {
      identifier: 'my-site/',
      entity_definition: 'LayoutData',
      operation: 'Update',
      entity_culture: 'en',
    },
    {
      identifier: 'EAB6F7C96E4A46AEB468D93EE9420A14',
      entity_definition: 'Item',
      operation: 'Update',
      entity_culture: 'en',
    },
  ],
};

describe('RevalidateMiddleware', () => {
  const endpoint = 'http://site';
  const apiKey = 'api-key';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });

  const getPersonalizeInfoStub = stub(GraphQLPersonalizeService.prototype, 'getPersonalizeInfo');
  const getPersonalizedResultsStub = stub(RevalidateMiddleware.prototype, 'getPersonalizedResults');

  describe('when personalize is true', () => {
    it('should return proper paths when all pages are personalized', async () => {
      const res = mockResponse();
      const req = mockRequest({ ...mockUpdatedPaths });

      getPersonalizeInfoStub.resolves({
        contentId: contentId,
        variantIds: [variantId_1, variantId_2],
      });

      getPersonalizedResultsStub.resolves({
        personalized: [
          { path: 'my-site/', variantId: variantId_1 },
          { path: 'my-site/About', variantId: variantId_2 },
        ],
        nonPersonalized: [],
      });

      const middleware = new RevalidateMiddleware({ clientFactory, personalize: true });
      await middleware.getHandler()(req, res);
      const pathsToRevalidate = [/_variantId_variantId-1/, '_variantId_variantId-2/About'];

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith({ revalidated: true });
      expect(res.revalidate.callCount).to.equal(pathsToRevalidate.length);
      expect(res.revalidate).to.be.calledWith(`/_variantId_${variantId_1}/`);
      expect(res.revalidate).to.be.calledWith(`/_variantId_${variantId_2}/About`);
    });

    it('should return proper paths when one page is personalized and other is not', async () => {
      const res = mockResponse();
      const req = mockRequest({ ...mockUpdatedPaths });

      getPersonalizeInfoStub.resolves({
        contentId: contentId,
        variantIds: [variantId_1],
      });

      getPersonalizedResultsStub.resolves({
        personalized: [{ path: 'my-site/', variantId: variantId_1 }],
        nonPersonalized: [{ path: 'my-site/About' }],
      });

      const middleware = new RevalidateMiddleware({ clientFactory, personalize: true });
      await middleware.getHandler()(req, res);
      const pathsToRevalidate = [/_variantId_variantId-1/, '/About'];

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith({ revalidated: true });
      expect(res.revalidate.callCount).to.equal(pathsToRevalidate.length);
      expect(res.revalidate).to.be.calledWith(`/_variantId_${variantId_1}/`);
      expect(res.revalidate).to.be.calledWith('/About');
    });

    it('should return proper paths when one page is personalized and other is non-personalized with multiSite add-on', async () => {
      const res = mockResponse();
      const req = mockRequest({ ...mockUpdatedPaths });

      getPersonalizeInfoStub.resolves({ contentId: contentId, variantIds: [variantId_1] });

      getPersonalizedResultsStub.resolves({
        personalized: [{ path: 'my-site/', variantId: variantId_1 }],
        nonPersonalized: [{ path: 'my-site/About' }],
      });

      const middleware = new RevalidateMiddleware({
        clientFactory,
        personalize: true,
        multiSite: true,
      });
      await middleware.getHandler()(req, res);

      const pathsToRevalidate = [
        `/_variantId_${variantId_1}/_site_my-site/`,
        '/_site_my-site/About',
      ];

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith({ revalidated: true });
      expect(res.revalidate.callCount).to.equal(pathsToRevalidate.length);
      expect(res.revalidate).to.be.calledWith(`/_variantId_${variantId_1}/_site_my-site/`);
      expect(res.revalidate).to.be.calledWith('/_site_my-site/About');
    });
  });

  it('should return proper paths when only multiSite is true', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({ clientFactory, multiSite: true });

    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.have.been.calledWithExactly('/_site_my-site/');
    expect(res.revalidate).to.have.been.calledWithExactly('/_site_my-site/About');
  });

  it('should return proper paths when both multiSite and personalize are false', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({ clientFactory });
    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.have.been.calledWithExactly('/');
    expect(res.revalidate).to.have.been.calledWithExactly('/About');
  });

  it('should return proper paths when other locales are configured besides defaultLocale and got updated', async () => {
    const res = mockResponse();
    const req = mockRequest({
      updates: [
        {
          identifier: 'my-site/About',
          entity_definition: 'LayoutData',
          operation: 'Update',
          entity_culture: 'fr-CA',
        },
        {
          identifier: 'my-site/',
          entity_definition: 'LayoutData',
          operation: 'Update',
          entity_culture: 'fr-CA',
        },
      ],
    });

    const middleware = new RevalidateMiddleware({
      clientFactory,
      localePrefix: () => 'fr-CA',
    });

    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.have.been.calledWithExactly('/fr-CA/');
    expect(res.revalidate).to.have.been.calledWithExactly('/fr-CA/About');
  });

  it('should return proper paths when only defaultLanguage is configured', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({
      clientFactory,
      localePrefix: () => '',
    });
    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.have.been.calledWithExactly('/');
    expect(res.revalidate).to.have.been.calledWithExactly('/About');
  });

  it('should return 204 when there is nothing to revalidate ', async () => {
    const res = mockResponse();
    const req = mockRequest({
      updates: [],
    });

    const middleware = new RevalidateMiddleware({ clientFactory });
    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith({ message: 'No updates to revalidate' });
  });

  it('should throw 500 if revalidation fails', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({
      clientFactory,
    });

    await middleware.getHandler()(req, res);

    res.revalidate = stub().throws(new Error('revalidation failed'));

    try {
      await middleware.getHandler()(req, res);
      expect.fail('Error revalidating');
    } catch (error) {
      expect(error.message).to.equal('Error revalidating');

      // Ensure that res.status is called with 500 in the catch block
      expect(res.status).to.be.calledWith(500);
      expect(res.json).calledWith({ revalidated: false });
    }
  });
});
