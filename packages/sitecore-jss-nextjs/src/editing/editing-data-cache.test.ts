import { expect } from 'chai';
import { EditingData } from './editing-data';
import { EditingDataDiskCache } from './editing-data-cache';
import { data } from '../test-data/editing-data';

describe('EditingDataDiskCache', () => {
  it('should write/read editing data', async () => {
    const key = data.layoutData.sitecore.route.itemId;
    const cache = new EditingDataDiskCache();
    cache.set(key, data as EditingData);
    const result = (await cache.get(key)) as EditingData;
    expect(data).to.deep.equal(result);
  });

  it('should return undefined on cache miss', async () => {
    const cache = new EditingDataDiskCache();
    const result = await cache.get('nope');
    expect(result).to.equal(undefined);
  });
});
