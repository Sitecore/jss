import React from 'react'
import { View, Text as NText } from 'react-native'
import { Text } from '@sitecore-jss/sitecore-jss-react-native'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'

const StyleguideFieldUsageItemLink = ({ fields, rendering }) => {
	const { sharedItemLink, localItemLink } = fields

	console.log(fields)

	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<View>
				<NText>Field:</NText>
				<Text field={sharedItemLink.fields} />
			</View>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageItemLink
