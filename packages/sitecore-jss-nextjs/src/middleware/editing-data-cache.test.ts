import { expect } from 'chai';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataDiskCache } from './editing-data-cache';
import { data } from '../testData/editing-data';

describe('EditingDataDiskCache', () => {
  it('should write/read editing data', () => {
    const key = data.layoutData.sitecore.route.itemId;
    const cache = new EditingDataDiskCache();
    cache.set(key, data as EditingData);
    const result = cache.get(key) as EditingData;
    expect(data).to.deep.equal(result);
  });

  it('should return undefined on cache miss', () => {
    const cache = new EditingDataDiskCache();
    const result = cache.get('nope');
    expect(result).to.equal(undefined);
  });
});
