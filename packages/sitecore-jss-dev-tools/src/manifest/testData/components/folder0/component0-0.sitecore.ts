import { Manifest } from './../../../../index';
import { CommonFieldTypes } from '../../../generator/manifest.types';

export default (manifest: Manifest) => {
  manifest.addComponent({
    name: 'Component0-0',
    displayName: 'Component0-0',
    fields: [{ name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText }],
    placeholders: [{ name: 'page-header' }],
    params: ['param1'],
  });
};
