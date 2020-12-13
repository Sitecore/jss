/// <reference types="../global" />
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { EditingMiddleware, extractEditingData } from './editing-middleware';
import { HtmlProcessor } from './html-processors';
import { EditingRequest } from '@sitecore-jss/sitecore-jss-nextjs';
import Server from 'next/dist/next-server/server/next-server';

const expect = chai.expect;
chai.use(sinonChai);

const EDIT_ROUTE = '_edit';

const mockRequest = (body?: object) => {
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
    const req = mockRequest();
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
    const req = mockRequest();
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
    const req = mockRequest();
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('<html></html>');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);
    expect((nextApp.renderToHTML.args[0][0] as EditingRequest).editingData, 'request.editingData').to.not.be.undefined;
  });
  
  it('should return json with rendered html', async () => {
    const req = mockRequest();
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

  it('should respond with 500 if rendered html empty', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const nextApp = sinon.createStubInstance(Server);
    nextApp.renderToHTML.resolves('');
    const middleware = new EditingMiddleware(nextApp as unknown as Server, EDIT_ROUTE);
    const handler = middleware.getRequestHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(500);
  });

  it('should run html processors', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const html = '<html></html>';
    const processor = {
      processHtml: sinon.stub()
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

  // The Experience Editor will send the following body data structure,
  // though we're only concerned with the "args".
  // {
  //   id: 'JSS app name', UNUSED
  //   args: ['path', 'serialized layout data object', 'serialized viewbag object'],
  //   functionName: 'renderView', UNUSED
  //   moduleName: 'server.bundle' UNUSED
  // }
  // The 'serialized viewbag object' structure:
  // {
  //   language: 'language',
  //   dictionary: 'key-value representation of tokens and their corresponding translations',
  //   httpContext: 'serialized request data' UNUSED
  // }

  const TEST_PATH = '/test/path';
  const TEST_LANGUAGE = 'en';
  const TEST_LAYOUT = '{\"sitecore\":{\"context\":{\"pageEditing\":true,\"site\":{\"name\":\"JssNext\"},\"pageState\":\"normal\",\"language\":\"en\"},\"route\":{\"name\":\"home\",\"displayName\":\"home\",\"fields\":{\"pageTitle\":{\"value\":\"Welcome to Sitecore JSS\"}},\"databaseName\":\"master\",\"deviceId\":\"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3\",\"itemId\":\"d6ac9d26-9474-51cf-982d-4f8d44951229\",\"itemLanguage\":\"en\",\"itemVersion\":1,\"layoutId\":\"4092f843-b14e-5f7a-9ae6-3ed9f5c2b919\",\"templateId\":\"ca5a5aeb-55ae-501b-bb10-d37d009a97e1\",\"templateName\":\"App Route\",\"placeholders\":{\"jss-main\":[{\"uid\":\"2c4a53cc-9da8-5f51-9d79-6ee2fc671b2d\",\"componentName\":\"ContentBlock\",\"dataSource\":\"{FF0E7D28-D8EF-539C-9CEC-28E1175F8C1D}\",\"params\":{},\"fields\":{\"heading\":{\"value\":\"Welcome to Sitecore JSS\"},\"content\":{\"value\":\"<p>Thanks for using JSS!! Here are some resources to get you started:<\/p>\"}}}]}}}}';
  const TEST_DICTIONARY = '{\"entry1\":\"Entry One\",\"entry2\":\"Entry Two\"}';
  const TEST_ARGS = [
    TEST_PATH, 
    TEST_LAYOUT,
    `{\"language\":\"${TEST_LANGUAGE}\",\"dictionary\":${TEST_DICTIONARY}}`
  ];

  it('should return empty result if body missing', () => {
    const emptyResult = {
      path: '',
      language: '',
      layoutData: null,
      dictionary: null,
    };
    const req = mockRequest();
    const data = extractEditingData(req);
    expect(data).to.eql(emptyResult);
  });

  it('should return path', () => {
    const req = mockRequest({
      args: TEST_ARGS,
    })
    const data = extractEditingData(req);
    expect(data.path).to.equal(TEST_PATH);
  });

  it('should return language', () => {
    const req = mockRequest({
      args: TEST_ARGS,
    })
    const data = extractEditingData(req);
    expect(data.language).to.equal(TEST_LANGUAGE);
  });
  
  it('should return layout data', () => {
    const req = mockRequest({
      args: TEST_ARGS,
    })
    const data = extractEditingData(req);
    const expected = JSON.parse(TEST_LAYOUT);
    expect(data.layoutData).to.eql(expected);
  });

  it('should return dictionary', () => {
    const req = mockRequest({
      args: TEST_ARGS,
    })
    const data = extractEditingData(req);
    const expected = JSON.parse(TEST_DICTIONARY);
    expect(data.dictionary).to.eql(expected);
  });

});
