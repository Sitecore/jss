import { expect, use } from 'chai';
import { Redis } from '@upstash/redis';
import sinon from 'sinon';
import { EditingData } from './editing-data';
import { RedisEditingDataCache, RedisEditingDataCacheOptions } from './redis-editing-data-cache';
import sinonChai from 'sinon-chai';

use(sinonChai);
const sandbox = sinon.createSandbox();

describe('redis editing data cache', () => {
  const setup = (
    key: string,
    value: Record<string, unknown> | null,
    options?: Partial<RedisEditingDataCacheOptions>
  ) => {
    const cache = new RedisEditingDataCache({
      redisUrl: 'https://test',
      redisToken: 'test',
      ...options,
    });
    const redisCache = ((cache as unknown) as { redisCache: Redis }).redisCache;
    sandbox.stub(redisCache, 'set').resolves();
    sandbox
      .stub(redisCache, 'get')
      .withArgs(key)
      .resolves(value);
    sandbox.stub(redisCache, 'expire').resolves();
    return { cache, redisCache };
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
    const { cache } = setup(key, expectedResult);

    const result = await cache.get(key);

    expect(result as EditingData).to.deep.equal(expectedResult);
  });

  it('should return undefined on cache miss', async () => {
    const key = 'no-such-key';
    const { cache } = setup(key, null);
    const result = await cache.get('no-such-key');
    expect(result).to.deep.equal(undefined);
  });

  it('should invalidate entry after get', async () => {
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
    const { cache, redisCache } = setup(key, expectedResult);

    await cache.get(key);

    expect(redisCache.expire).to.have.been.calledWith(key, 0);
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
    const { cache, redisCache } = setup('key', {});

    await cache.set(key, entry);

    expect(redisCache.set).to.have.been.calledWith(key, JSON.stringify(entry));
  });

  it('should put entries into storage with the default ttl', async () => {
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
    const { cache, redisCache } = setup('key', {});

    await cache.set(key, entry);

    expect(redisCache.set).to.have.been.calledWith(key, JSON.stringify(entry), { ex: 120 });
  });

  it('should put entries into storage with a custom ttl', async () => {
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
    const { cache, redisCache } = setup('key', {}, { defaultTtl: 30 });

    await cache.set(key, entry);

    expect(redisCache.set).to.have.been.calledWith(key, JSON.stringify(entry), { ex: 30 });
  });

  it('should throw if initialized without API URL and token', () => {
    expect(() => new RedisEditingDataCache({ redisUrl: '', redisToken: '' })).to.throw();
  });
});
