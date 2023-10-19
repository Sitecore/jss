/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData } from './editing-data';
import { EditingDataCache } from './editing-data-cache';
import {
  ServerlessEditingDataService,
  BasicEditingDataService,
  generateKey,
} from './editing-data-service';
import { QUERY_PARAM_EDITING_SECRET } from './constants';
import sinonChai from 'sinon-chai';
import { spy } from 'sinon';

use(sinonChai);
use(chaiAsPromised);

const mockFetcher = (data?: unknown) => {
  const fetcher = {} as AxiosDataFetcher;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher.get = spy<any>(() => {
    return Promise.resolve({ data });
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher.put = spy<any>(() => {
    return Promise.resolve();
  });
  return fetcher;
};

describe('generateKey', () => {
  it('should generate unique key for item', async () => {
    const data = {
      layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
    } as EditingData;

    const key1 = generateKey(data);
    const key2 = generateKey(data);

    expect(key1).to.not.equal(key2);
  });

  it('should generate unique key for item when route is null', async () => {
    const data = {
      layoutData: { sitecore: { route: null } },
    } as EditingData;

    const key1 = generateKey(data);
    const key2 = generateKey(data);

    expect(key1).to.not.equal(key2);
  });
});

describe('ServerlessEditingDataService', () => {
  const secret = 'secret1234';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  it('should throw for apiRoute missing [key]', () => {
    expect(
      () => new ServerlessEditingDataService({ apiRoute: '/api/editing/data/[nope]' })
    ).to.throw();
  });

  describe('setEditingData', () => {
    it('should invoke PUT request and return preview data', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}`;

      const fetcher = mockFetcher();

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      return service.setEditingData(data, serverUrl).then((previewData) => {
        expect(previewData.key).to.equal(key);
        expect(previewData.serverUrl).to.equal(serverUrl);
        expect(fetcher.put).to.have.been.calledOnce;
        expect(fetcher.put).to.have.been.calledWithExactly(expectedUrl, data);
      });
    });

    it('should invoke PUT request with extra params and return in preview data', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const paramFoo = 'foo';
      const paramBar = 'bar';
      const params = { paramFoo, paramBar };
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}&paramFoo=${paramFoo}&paramBar=${paramBar}`;

      const fetcher = mockFetcher();

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      return service.setEditingData(data, serverUrl, params).then((previewData) => {
        expect(previewData.params).to.equal(params);
        expect(fetcher.put).to.have.been.calledOnce;
        expect(fetcher.put).to.have.been.calledWithExactly(expectedUrl, data);
      });
    });

    it('should use custom apiRoute', async () => {
      const data = {
        layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/some/path/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}`;

      const fetcher = mockFetcher();

      const service = new ServerlessEditingDataService({
        dataFetcher: fetcher,
        apiRoute: '/api/some/path/[key]',
      });
      service['generateKey'] = () => key;

      return service.setEditingData(data, serverUrl).then(() => {
        expect(fetcher.put).to.have.been.calledOnce;
        expect(fetcher.put).to.have.been.calledWithExactly(expectedUrl, data);
      });
    });

    it('should URI encode secret and params', async () => {
      const superSecret = ';,/?:@&=+$';
      const encodedSecret = encodeURIComponent(superSecret);
      process.env.JSS_EDITING_SECRET = superSecret;
      const data = {
        layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${encodedSecret}&param=${encodedSecret}`;

      const fetcher = mockFetcher();

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      return service.setEditingData(data, serverUrl, { param: superSecret }).then(() => {
        expect(fetcher.put).to.have.been.calledOnce;
        expect(fetcher.put).to.have.been.calledWithExactly(expectedUrl, data);
      });
    });
  });

  describe('getEditingData', () => {
    it('should invoke GET request', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}`;

      const fetcher = mockFetcher(data);

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      const editingData = await service.getEditingData({ key, serverUrl });
      expect(editingData).to.equal(data);
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get).to.have.been.calledWith(expectedUrl);
    });

    it('should invoke GET request with extra params', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const paramFoo = 'foo';
      const paramBar = 'bar';
      const params = { paramFoo, paramBar };
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}&paramFoo=${paramFoo}&paramBar=${paramBar}`;

      const fetcher = mockFetcher(data);

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      const editingData = await service.getEditingData({ key, serverUrl, params });
      expect(editingData).to.equal(data);
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get).to.have.been.calledWith(expectedUrl);
    });

    it('should return undefined if serverUrl missing', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const fetcher = mockFetcher(data);

      const service = new ServerlessEditingDataService({ dataFetcher: fetcher });
      service['generateKey'] = () => key;

      const editingData = await service.getEditingData({ key });
      expect(editingData).to.equal(undefined);
      expect(fetcher.get).to.not.have.been.called;
    });
  });
});

describe('BasicEditingDataService', () => {
  const mockCache = (data?: EditingData) => {
    const cache = {} as EditingDataCache;
    cache.set = spy();
    cache.get = spy(() => {
      return Promise.resolve(data);
    });
    return cache;
  };

  describe('setEditingData', () => {
    it('should set to cache and return preview data', async () => {
      const key = 'key1234';
      const data = {
        path: '/styleguide',
      } as EditingData;
      const cache = mockCache();

      const service = new BasicEditingDataService({ editingDataCache: cache });
      service['generateKey'] = () => key;

      return service.setEditingData(data).then((previewData) => {
        expect(previewData.key).to.equal(key);
        expect(cache.set).to.have.been.calledOnce;
        expect(cache.set).to.have.been.calledWithExactly(key, data);
      });
    });
  });

  describe('getEditingData', () => {
    it('should get from cache', async () => {
      const key = '1234key';
      const data = {
        path: '/styleguide',
      } as EditingData;
      const cache = mockCache(data);

      const service = new BasicEditingDataService({ editingDataCache: cache });
      service['generateKey'] = () => key;

      const editingData = await service.getEditingData({ key });
      expect(editingData).to.equal(data);
      expect(cache.get).to.have.been.calledOnce;
      expect(cache.get).to.have.been.calledWithExactly(key);
    });
  });
});
