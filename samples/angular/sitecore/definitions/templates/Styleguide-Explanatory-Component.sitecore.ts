// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is a standalone _base template_ that is inherited by components in the styleguide that need to
 * show explanatory text. The fields on this template are implicitly available on inherited components.
 * Note: inherited fields cannot be modified when inherited (e.g. with different validation rules or help text).
 * Ensure that there is truly an inheritance relationship and not merely "they happen share some fields" before using inheritance.
 */
export default function StyleguideExplanatoryComponentTemplate(manifest: Manifest) {
  manifest.addTemplate({
    name: 'JssAngularWeb-Styleguide-Explanatory-Component',
    id: 'JssAngularWeb-styleguide-explanatory-component-template',
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'description', type: CommonFieldTypes.RichText },
    ],
  });
}
