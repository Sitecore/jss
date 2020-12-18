/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// / <reference types="../global" />
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { EditingMiddleware, extractEditingData } from './editing-middleware';
import { HtmlProcessor } from './html-processors';
import { EE_PATH, EE_LANGUAGE, EE_LAYOUT, EE_DICTIONARY, EE_BODY } from './testData/ee-data';
import { EditingRequest } from '@sitecore-jss/sitecore-jss-nextjs';
import Server from 'next/dist/next-server/server/next-server';

const expect = chai.expect;
chai.use(sinonChai);

const EDIT_ROUTE = '_edit';

const mockRequest = (body?: any) => {
  return {
    method: 'POST',
    url: '/',
    body: body ?? {},
  } as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('EditingMiddleware', () => {

  it('should call renderToHTML', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('<html></html>');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(nextApp.renderToHTML.calledOnce);
    expect(nextApp.renderToHTML.args[0][0].method, 'request.method').to.equal('GET');
    expect(nextApp.renderToHTML.args[0][0].url, 'request.url').to.equal(EDIT_ROUTE);
    expect(nextApp.renderToHTML.args[0][2], 'pathname').to.equal(EDIT_ROUTE);
  });

  it('should use custom editRoute', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();
    const customEditRoute = 'testRoute';

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('<html></html>');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, customEditRoute);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(nextApp.renderToHTML.args[0][0].url, 'request.url').to.equal(customEditRoute);
    expect(nextApp.renderToHTML.args[0][2], 'pathname').to.equal(customEditRoute);
  });

  it('should set editingData on request', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('<html></html>');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);
    expect((nextApp.renderToHTML.args[0][0] as EditingRequest).editingData, 'request.editingData').to.not.be.undefined;
  });

  it('should return json with rendered html', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();
    const html = '<html></html>';

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves(html);
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ html });
  });

  it('should respond with 500 if body empty', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(500);
  });


  it('should respond with 500 if rendered html empty', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(500);
  });

  it('should run html processors', async () => {
    const req = mockRequest(EE_BODY);
    const res = mockResponse();
    const html = '<html></html>';
    const processor = {
      processHtml: sinon.stub(),
    } as HtmlProcessor;

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves(html);
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE, [ processor ]);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(processor.processHtml).to.have.been.calledWith(html);
  });

});

describe('extractEditingData', () => {

  it('should throw if body missing', () => {
    const req = mockRequest();
    expect(() => extractEditingData(req)).to.throw;
  });

  it('should return path', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    expect(data.path).to.equal(EE_PATH);
  });

  it('should return language', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    expect(data.language).to.equal(EE_LANGUAGE);
  });

  it('should return layout data', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    const expected = JSON.parse(EE_LAYOUT);
    expect(data.layoutData).to.eql(expected);
  });

  it('should return dictionary', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    const expected = JSON.parse(EE_DICTIONARY);
    expect(data.dictionary).to.eql(expected);
  });

});
