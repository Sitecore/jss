import { Manifest } from '@root';
import { CommonFieldTypes } from '../../generator/manifest.types';

export default (manifest: Manifest) => {
  manifest.addComponent({
    name: 'Welcome',
    displayName: 'Welcome',
    fields: [
      { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', displayName: 'Text', type: CommonFieldTypes.RichText },
      { name: 'logoImage', displayName: 'LogoImage', type: CommonFieldTypes.Image },
    ],
    placeholders: [],
    params: [],
  });
};
