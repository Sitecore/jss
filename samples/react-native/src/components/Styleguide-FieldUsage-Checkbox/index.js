import React from 'react'
import { Text } from 'react-native'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'

const StyleguideFieldUsageCheckbox = ({ fields, rendering }) => {

	const showState = (field) => <Text>{field} is {fields[field].value.toString()}</Text>

	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			{showState('checkbox')}
			{showState('checkbox2')}
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageCheckbox;
