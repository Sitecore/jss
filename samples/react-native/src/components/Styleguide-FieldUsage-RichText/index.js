import React from 'react'
import { View } from 'react-native'
import { RichText } from '@sitecore-jss/sitecore-jss-react-native'

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'

const StyleguideFieldUsageRichText = ({ fields, rendering }) => {
	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<View>
				<RichText field={fields.sample} />
				<RichText field={fields.sample2} />
			</View>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageRichText
