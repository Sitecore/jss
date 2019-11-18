import React from 'react';
import { View } from 'react-native';
import { Text } from '@sitecore-jss/sitecore-jss-react-native';
import PropTypes from 'prop-types';

import styles from './styles'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'

const StyleguideFieldUsageText = ({ fields, rendering }) => {
	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<View>
				<Text style={styles.text} field={fields.sample} />
				<Text style={styles.text} field={fields.sample2} />
			</View>
		</StyleguideSpecimen>
	)
}

const FieldsProps = PropTypes.shape({
	heading: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	sample: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	}),
	sample2: PropTypes.shape({
		value: PropTypes.string,
		editable: PropTypes.string
	})
})

StyleguideFieldUsageText.propTypes = {
	componentFactory: PropTypes.func.isRequired,
	rendering: PropTypes.shape({
		componentName: PropTypes.string.isRequired,
		fields: FieldsProps.isRequired
	}).isRequired,
	fields: FieldsProps.isRequired
}

export default StyleguideFieldUsageText
