import { Manifest } from '../../../index';
import { CommonFieldTypes } from '../../generator/manifest.types';
import data from './contentData';

export default (manifest: Manifest) => {
  manifest.addContent(data);
  manifest.addTemplate({
    name: 'FormContent',
    fields: [
      { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
      { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
    ],
  });
};
