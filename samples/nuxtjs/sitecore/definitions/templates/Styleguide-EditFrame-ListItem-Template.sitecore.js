// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * This is the data template for an individual _item_ in the Styleguide's Edit Frame component demo.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addTemplate({
    name: 'Vue-Styleguide-EditFrame-ListItem-Template',
    fields: [{ name: 'title', type: CommonFieldTypes.SingleLineText }],
  });
}
