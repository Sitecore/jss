import React from 'react'
import { Text as NText } from 'react-native'
import PropTypes from 'prop-types'
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

const FieldsProps = PropTypes.shape({
	description: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	heading: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	sample1: PropTypes.shape({
		value: PropTypes.number,
		editable: PropTypes.number
	}),
	sample2: PropTypes.shape({
		value: PropTypes.number,
		editable: PropTypes.number
	})
})

StyleguideFieldUsageNumber.propTypes = {
	componentFactory: PropTypes.func.isRequired,
	rendering: PropTypes.shape({
		componentName: PropTypes.string.isRequired,
		fields: FieldsProps.isRequired
	}).isRequired,
	fields: FieldsProps.isRequired
}

export default StyleguideFieldUsageNumber
