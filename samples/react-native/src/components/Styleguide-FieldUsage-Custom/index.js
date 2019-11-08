import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react-native';
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

/**
 * Demonstrates usage of a custom content field type within JSS.
 * See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
 * for the definition of the structure of the custom field. This code is just for display.
 */
const StyleguideFieldUsageCustom = ({ fields, rendering }) => (
	<StyleguideSpecimen fields={fields} rendering={rendering}>
		{/* Because the integer field is essentially text, we can render it with the Text helper */}
		<Text field={fields.customIntField} />
	</StyleguideSpecimen>
);

export default StyleguideFieldUsageCustom;
