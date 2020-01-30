import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
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

const FieldsProps = PropTypes.shape({
	heading: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	description: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	checkbox: PropTypes.shape({
		value: PropTypes.bool
	}),
	checkbox2: PropTypes.shape({
		value: PropTypes.bool
	})
})

StyleguideFieldUsageCheckbox.propTypes = {
	componentFactory: PropTypes.func.isRequired,
	rendering: PropTypes.shape({
		componentName: PropTypes.string.isRequired,
		fields: FieldsProps.isRequired
	}).isRequired,
	fields: FieldsProps.isRequired
}

export default StyleguideFieldUsageCheckbox;
