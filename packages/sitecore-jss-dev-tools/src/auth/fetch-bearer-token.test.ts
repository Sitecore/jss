import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import nock from 'nock';
import { fetchBearerToken } from './fetch-bearer-token';

describe('fetchBearerToken', () => {
  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
    process.env.SITECORE_AUTH_CLIENT_ID = undefined;
    process.env.SITECORE_AUTH_CLIENT_SECRET = undefined;
    process.env.SITECORE_AUTH_AUDIENCE = undefined;
    process.env.EXTRACT_CONSENT = undefined;
  });

  it('should send POST request to SITECORE_AUTH_ENDPOINT url', async () => {
    nock('https://auth.sitecorecloud.io')
      .post('/oauth/token')
      .reply(200, {
        token_type: 'Bearer',
        access_token: 'correct-token',
        expires_in: 3600,
        refresh_token: '******',
        scope: '*******',
      });

    nock('https://auth.sitecorecloud.io')
      .intercept('/.*/', '*')
      .reply(200, {
        token_type: 'Bearer',
        access_token: 'incorrect-token',
        expires_in: 3600,
        refresh_token: '******',
        scope: '*******',
      });

    const token = await fetchBearerToken();

    expect(token).to.equal('correct-token');
  });

  it('should use client_id, client_secret and audience values from process.env', async () => {
    process.env.SITECORE_AUTH_CLIENT_ID = 'test-client-id';
    process.env.SITECORE_AUTH_CLIENT_SECRET = 'test-client-secret';
    process.env.SITECORE_AUTH_AUDIENCE = 'test-audience';

    nock('https://auth.sitecorecloud.io')
      .post(
        '/oauth/token',
        (body) =>
          body.client_id === 'test-client-id' &&
          body.client_secret === 'test-client-secret' &&
          body.audience === 'test-audience'
      )
      .reply(200, {
        token_type: 'Bearer',
        access_token: 'correct-token',
        expires_in: 3600,
        refresh_token: '******',
        scope: '*******',
      });

    nock('https://auth.sitecorecloud.io')
      .intercept('/.*/', '*')
      .reply(200, {
        token_type: 'Bearer',
        access_token: 'incorrect-token',
        expires_in: 3600,
        refresh_token: '******',
        scope: '*******',
      });

    const token = await fetchBearerToken();

    expect(token).to.equal('correct-token');
  });

  it('should log when request to SITECORE_AUTH_ENDPOINT fails', async () => {
    nock('https://auth.sitecorecloud.io')
      .post('/oauth/token')
      .reply(503, 'Service Unavailable');
    const consoleErrorStub = sinon.stub(console, 'error');
    const token = await fetchBearerToken();

    expect(token).to.be.null;
    expect(consoleErrorStub.calledOnce).to.be.true;
    expect(consoleErrorStub.firstCall.args[0]).to.equal(
      chalk.red(
        'Error authenticating with Sitecore Auth endpoint: Error: Status: 503 Mesage: Service Unavailable'
      )
    );
  });
});
