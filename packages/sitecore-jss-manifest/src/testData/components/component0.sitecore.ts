import { Manifest } from '../../generator/manifest';
import { CommonFieldTypes } from '../../generator/manifest.types';

export default (manifest: Manifest) => {
  manifest.addComponent({
    name: 'Component0',
    displayName: 'Component0',
    fields: [
      { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'relatedItems', displayName: 'Related Items', type: CommonFieldTypes.ContentList },
    ],
    placeholders: [{ name: 'page-header' }],
    params: [{ name: 'param0' }],
  });

  manifest.addComponent({
    name: 'Component0-relatedItems-Item',
    displayName: 'Related Item',
    fields: [
      { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
    ],
  });
};
