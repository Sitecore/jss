/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataService, QUERY_PARAM_EDITING_SECRET } from './editing-data-service';

use(spies);
use(chaiAsPromised);

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
  const secret = 'secret1234';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  it('should throw for apiRoute missing [key]', () => {
    expect(() => new EditingDataService({ apiRoute: '/api/editing/data/[nope]' })).to.throw();
  });

  describe('setEditingData', () => {
    it('should invoke PUT request', async () => {
      const data = {
        path: '/styleguide',
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}`;

      const fetcher = mockFetcher();

      const service = new EditingDataService({ dataFetcher: fetcher });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      return service.setEditingData(data, serverUrl).then((previewData) => {
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
      const serverUrl = 'https://test.com';

      const service = new EditingDataService({ dataFetcher: fetcher });

      const previewData1 = await service.setEditingData(data, serverUrl);
      const previewData2 = await service.setEditingData(data, serverUrl);
      expect(previewData1.key).to.not.equal(previewData2.key);
    });

    it('should use custom apiRoute', async () => {
      const data = {
        layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/some/path/${key}?${QUERY_PARAM_EDITING_SECRET}=${secret}`;

      const fetcher = mockFetcher();

      const service = new EditingDataService({
        dataFetcher: fetcher,
        apiRoute: '/api/some/path/[key]',
      });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      return service.setEditingData(data, serverUrl).then(() => {
        expect(fetcher.put).to.have.been.called.once;
        expect(fetcher.put).to.have.been.called.with.exactly(expectedUrl, data);
      });
    });

    it('should URI encode secret', async () => {
      const superSecret = ';,/?:@&=+$';
      process.env.JSS_EDITING_SECRET = superSecret;
      const data = {
        layoutData: { sitecore: { route: { itemId: 'd6ac9d26-9474-51cf-982d-4f8d44951229' } } },
      } as EditingData;
      const key = '1234key';
      const serverUrl = 'https://test.com';
      const expectedUrl = `${serverUrl}/api/editing/data/${key}?${QUERY_PARAM_EDITING_SECRET}=${encodeURIComponent(
        superSecret
      )}`;

      const fetcher = mockFetcher();

      const service = new EditingDataService({ dataFetcher: fetcher });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      return service.setEditingData(data, serverUrl).then(() => {
        expect(fetcher.put).to.have.been.called.once;
        expect(fetcher.put).to.have.been.called.with.exactly(expectedUrl, data);
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

      const service = new EditingDataService({ dataFetcher: fetcher });
      spy.on(service, 'generateKey', () => {
        return key;
      });

      const editingData = await service.getEditingData({ key, serverUrl });
      expect(editingData).to.equal(data);
      expect(fetcher.get).to.have.been.called.once;
      expect(fetcher.get).to.have.been.called.with(expectedUrl);
    });
  });
});
