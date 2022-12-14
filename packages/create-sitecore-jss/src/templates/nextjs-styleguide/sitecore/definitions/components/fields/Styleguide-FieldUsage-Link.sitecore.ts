import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import { getDefinition } from '../../get-definition';

/**
 * Adds the Styleguide-FieldUsage-Link component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageLink(manifest: Manifest): void {
  const schema = getDefinition('fields/Styleguide-FieldUsage-Link.tsx');

  manifest.addComponent({
    icon: SitecoreIcon.Link,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
    ...schema,
  });
}
