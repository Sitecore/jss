/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from 'chai';
import * as vercelKv from '@vercel/kv';
import sinon from 'sinon';
import { EditingData } from './editing-data';
import { VercelEditingDataCache } from './vercel-editng-data-cache';
import sinonChai from 'sinon-chai';

use(sinonChai);
const sandbox = sinon.createSandbox();

describe('vercel editing data cache', () => {
  const setup = (key: string, value: Record<string, unknown> | null) => {
    const kvStub: vercelKv.VercelKV = new vercelKv.VercelKV({
      url: 'test',
      token: 'test',
    });
    sandbox.stub(kvStub, 'set').resolves();
    sandbox
      .stub(kvStub, 'get')
      .withArgs(key)
      .resolves(value);
    sandbox.stub(kvStub, 'expire').resolves();
    sandbox.stub(vercelKv, 'createClient').returns(kvStub);
    return kvStub;
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should get entries from storage', async () => {
    const key = 'top-secret';
    const expectedResult: EditingData = {
      path: '/rome',
      language: 'en',
      layoutData: {
        sitecore: {
          route: null,
          context: {},
        },
      },
      dictionary: {},
    };
    JSON.stringify(expectedResult);
    setup(key, expectedResult);

    const result = await new VercelEditingDataCache('test', 'tset').get(key);

    expect(result as EditingData).to.deep.equal(expectedResult);
  });

  it('should return undefined on cache miss', async () => {
    const key = 'no-such-key';
    setup(key, null);
    const result = await new VercelEditingDataCache('test', 'tset').get('no-such-key');
    expect(result).to.deep.equal(undefined);
  });

  it('should put entries into storage', async () => {
    const key = 'top-secret';
    const entry: EditingData = {
      path: '/rome',
      language: 'en',
      layoutData: {
        sitecore: {
          route: null,
          context: {},
        },
      },
      dictionary: {},
    };
    const kvStub = setup('key', {});

    await new VercelEditingDataCache('test', 'tset').set(key, entry);

    expect(kvStub.set).to.have.been.calledWith(key, JSON.stringify(entry));
  });

  it('should put entries into storage with ttl', async () => {
    const key = 'top-secret';
    const entry: EditingData = {
      path: '/rome',
      language: 'en',
      layoutData: {
        sitecore: {
          route: null,
          context: {},
        },
      },
      dictionary: {},
    };
    const ttl = 148;
    const kvStub = setup('key', {});

    await new VercelEditingDataCache('test', 'tset', ttl).set(key, entry);

    expect(kvStub.set).to.have.been.calledWith(key, JSON.stringify(entry));
    expect(kvStub.expire).to.have.been.calledWith(key, ttl);
  });

  it('should throw if initialized without API URL and token', () => {
    expect(() => new VercelEditingDataCache('', '')).to.throw();
  });
});
