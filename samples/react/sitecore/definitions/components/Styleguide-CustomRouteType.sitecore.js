// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-CustomRouteType component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  // This registers the custom route type with the manifest.
  // Like a component, a route type contains data fields -
  // but unlike a component, the fields are shared at the route level,
  // instead of at the component level. This is good for scenarios such as
  // article sections, where you may wish to use route-level fields for
  // _sorting and filtering_ (it's difficult to query on component-level field data).
  manifest.addRouteType({
    name: 'ExampleCustomRouteType',
    fields: [
      { name: 'headline', type: CommonFieldTypes.SingleLineText },
      { name: 'author', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.RichText },
    ],
  });

  // We're also adding a component, that we can put on our sample custom route type route.
  // This component will display the route level fields on the custom route type.
  manifest.addComponent({
    name: 'Styleguide-CustomRouteType',
    icon: SitecoreIcon.DocumentTag,
  });
}
