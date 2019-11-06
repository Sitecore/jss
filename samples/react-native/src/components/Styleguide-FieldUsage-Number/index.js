import React from 'react'
import { Text as NText } from 'react-native'
import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-react-native'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'

const StyleguideFieldUsageNumber = ({ fields, rendering }) => {
	const fieldValue = getFieldValue(fields, 'sample1')

	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<Text field={fields.sample1} />
			<Text field={fields.sample2} />

			<NText>
				JS value type: {typeof fieldValue}
			</NText>
			<NText>
				JS value: {fieldValue}
			</NText>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageNumber
