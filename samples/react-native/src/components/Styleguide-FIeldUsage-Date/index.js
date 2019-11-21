import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { DateField } from '@sitecore-jss/sitecore-jss-react-native'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'
import styles from './styles'

const StyleguideFieldUsageDate = ({ fields, rendering }) => {
	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<View style={styles.field}>
				<Text>Date helper: </Text>
				<DateField field={fields.date} />
			</View>
			<View style={styles.field}>
				<Text>Date helper (datetime): </Text>
				<DateField field={fields.dateTime} />
			</View>
			<View style={styles.field}>
				<Text>UTC Date string: </Text>
				<DateField field={fields.date} render={date => <Text>{date.toUTCString()}</Text>} />
			</View>
			<View style={styles.field}>
				<Text>Localized Date string (local timezone): </Text>
				<DateField field={fields.date} render={(date) => <Text>{date.toLocaleDateString()}</Text>} />
			</View>
			<View style={styles.field}>
				<Text>Localized DateTime string (local timezone): </Text>
				<DateField
					field={fields.dateTime}
					render={date => <Text>{date.toLocaleString()}</Text>}
				/>
			</View>
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
	date: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	dateTime: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	})
})

StyleguideFieldUsageDate.propTypes = {
	componentFactory: PropTypes.func.isRequired,
	rendering: PropTypes.shape({
		componentName: PropTypes.string.isRequired,
		fields: FieldsProps.isRequired
	}).isRequired,
	fields: FieldsProps.isRequired
}

export default StyleguideFieldUsageDate
