import { expect } from 'chai';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataDiskCache } from './editing-data-cache';
import { data as styleguideData } from '../testData/editing-data-styleguide';

describe('EditingDataDiskCache', () => {
  it('should write/read editing data', () => {
    const key = styleguideData.layoutData.sitecore.route.itemId;
    const cache = new EditingDataDiskCache();
    cache.set(key, styleguideData as EditingData);
    const result = cache.get(key) as EditingData;
    expect(styleguideData).to.deep.equal(result);
  });
});
