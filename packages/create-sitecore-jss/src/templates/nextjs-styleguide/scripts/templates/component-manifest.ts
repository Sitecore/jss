/**
 * Generates manifest API boilerplate for a component under `sitecore/definitions/components`
 * @param componentName - the component name
 * @returns component manifest boilerplate as a string
 */
function generateComponentManifest(componentName: string): string {
  return `// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the ${componentName} component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ${componentName}(manifest: Manifest): void {
  manifest.addComponent({
    name: '${componentName}',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
`;
}

export default generateComponentManifest;
