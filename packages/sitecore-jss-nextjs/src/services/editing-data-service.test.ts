/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataService, QUERY_PARAM_SECURITY_TOKEN } from './editing-data-service';

use(spies);

const mockFetcher = (data?: any) => {
  const fetcher = {} as AxiosDataFetcher;
  fetcher.get = spy<any>(() => {
    return Promise.resolve({ data });
  });
  fetcher.put = spy<any>(() => {
    return Promise.resolve();
  });
  return fetcher;
};

describe('EditingDataService', () => {
  const publicUrl = 'http://test.com';
  const token = 'token1234';

  beforeEach(() => {
    process.env.PUBLIC_URL = publicUrl;
    process.env.SITECORE_SECURITY_TOKEN = token;
  });

  after(() => {
    delete process.env.PUBLIC_URL;
    delete process.env.SITECORE_SECURITY_TOKEN;
  });

  it('should throw for apiRoute missing [key]', () => {
    const service = new EditingDataService({ apiRoute: '/api/editing/data/[nope]' });
    expect(service.setEditingData({} as EditingData)).to.throw;
    expect(service.getEditingData({ key: '' })).to.throw;
  });

  describe('setEditingData', () => {
    it('should invoke PUT request', () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const expectedUrl = `${publicUrl}/api/editing/data/${key}?${QUERY_PARAM_SECURITY_TOKEN}=${token}`;

      const fetcher = mockFetcher();

      const service = new EditingDataService({ dataFetcher: fetcher });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      return service.setEditingData(data).then((previewData) => {
        expect(previewData.key).to.equal(key);
        expect(fetcher.put).to.have.been.called.once;
        expect(fetcher.put).to.have.been.called.with.exactly(expectedUrl, data);
      });
    });

    it('should generate unique key for item', async () => {
      const data = {
        layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
      } as EditingData;
      const fetcher = mockFetcher();

      const service = new EditingDataService({ dataFetcher: fetcher });

      const previewData1 = await service.setEditingData(data);
      const previewData2 = await service.setEditingData(data);
      expect(previewData1.key).to.not.equal(previewData2.key);
    });
  });

  describe('getEditingData', () => {
    it('should invoke GET request', () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const expectedUrl = `${publicUrl}/api/editing/data/${key}?${QUERY_PARAM_SECURITY_TOKEN}=${token}`;

      const fetcher = mockFetcher(data);

      const service = new EditingDataService({ dataFetcher: fetcher });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      return service.getEditingData({ key }).then((editingData) => {
        expect(editingData).to.equal(data);
        expect(fetcher.get).to.have.been.called.once;
        expect(fetcher.get).to.have.been.called.with(expectedUrl);
      });
    });
  });
});
