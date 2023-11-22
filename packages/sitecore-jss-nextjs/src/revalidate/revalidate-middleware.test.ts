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
const id = 'item-id';
const version = '1';
const contentId = `${id}_en_${version}`.toLowerCase();

const mockRequest = (body?: any, query?: Query, method?: string, host?: string) => {
  return {
    body: body ?? {},
    method: method ?? 'POST',
    query: query ?? {},
    headers: { host: host ?? 'localhost:3000' },
  } as NextApiRequest;
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

  it('should return 204 when there is nothing to revalidate ', async () => {
    const res = mockResponse();
    const req = mockRequest({
      updates: [],
    });

    const middleware = new RevalidateMiddleware({ clientFactory });
    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith({});
  });

  it('should return proper paths when personalize is true', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    getPersonalizeInfoStub.resolves({ contentId: contentId, variantIds: [variantId_1] });

    const middleware = new RevalidateMiddleware({ clientFactory, personalize: true });
    await middleware.getHandler()(req, res);

    expect(getPersonalizeInfoStub.callCount).to.equal(2);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.be.calledWith(`/_variantId_${variantId_1}/my-site/About`);
  });

  it('should revalidate when a site has some personalized and others non-personalized pages', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    getPersonalizeInfoStub.resolves(undefined);

    const middleware = new RevalidateMiddleware({ clientFactory, personalize: true });
    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.be.calledWith('/my-site/About');
  });

  it('should revalidate when a site some personalized and some non-personalized pages with multiSite add-on', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({
      clientFactory,
      personalize: true,
      multiSite: true,
    });
    getPersonalizeInfoStub.resolves({ contentId: contentId, variantIds: [variantId_1] });

    await middleware.getHandler()(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ revalidated: true });
    expect(res.revalidate).to.be.calledWithExactly(
      `/_variantId_${variantId_1}/_site_my-site/About`
    );
  });

  it('should return proper paths when multiSite is true and personalize is false', async () => {
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

  it('should throw 500 if revalidation fails', async () => {
    const res = mockResponse();
    const req = mockRequest({ ...mockUpdatedPaths });

    const middleware = new RevalidateMiddleware({ clientFactory });

    await middleware.getHandler()(req, res);

    res.revalidate = stub().throws(new Error('revalidation failed'));

    try {
      await middleware.getHandler()(req, res);
      expect.fail('Error revalidating');
    } catch (error) {
      expect(error.message).to.equal('Error revalidating');

      // Ensure that res.status is called with 500 in the catch block
      expect(res.status).to.be.calledWith(500);
      expect(res.json).calledWith({ message: 'Error revalidating' });
    }
  });
});
