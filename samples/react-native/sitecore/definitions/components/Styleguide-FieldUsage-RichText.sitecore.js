import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Text component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default (manifest) => {
	manifest.addComponent({
		name: 'Styleguide-FieldUsage-RichText',
		fields: [
			{ name: 'sample', type: CommonFieldTypes.SingleLineText },
			{
				name: 'sample2',
				displayName: 'Customize Name Shown in Sitecore',
				required: true,
				type: CommonFieldTypes.SingleLineText,
			},
		]
	});
}