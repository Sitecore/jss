import {
  CommonFieldTypes,
  SitecoreIcon,
  Manifest,
} from "@sitecore-jss/sitecore-jss-dev-tools";

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ReactContentBlock(manifest: Manifest): void {
  manifest.addComponent({
    name: "React-ContentBlock",
    templateName: "AstroApp-React-ContentBlock",
    // totally optional, but fun
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: "heading", type: CommonFieldTypes.SingleLineText },
      { name: "content", type: CommonFieldTypes.RichText },
    ],
  });
}
