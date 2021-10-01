import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-RouteFields component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideRouteFields(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-RouteFields',
    templateName: 'JssNextWeb-Styleguide-RouteFields',
    icon: SitecoreIcon.TextField,
    // this component gets all of its fields from the _route_,
    // so it does not need any local fields defined.

    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
