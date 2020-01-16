import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'
import styles from './styles'

const StyleguideComponentParams = ({ fields, rendering, params }) => {
	const { cssClass, columns, useCallToAction } = params

	const colsArr = columns && [...Array(parseInt(columns))];

	const renderCol = (_, i) => <Text key={`col-${i}`}>Column {i}</Text>

	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<Text style={styles[cssClass]}>
				The CSS class of this paragraph ({cssClass}) is set using a param
			</Text>
			<Text>
				useCallToAction param: {useCallToAction}
				param type: {typeof useCallToAction}
			</Text>
			{useCallToAction &&
				<Text style={styles.callToAction}>the call to action is shown</Text>}

			<Text>columns param: {columns}</Text>

			{colsArr && <View style={styles.columns}>
				{colsArr.map(renderCol)}
			</View>}
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
	})
})

const ParamsProps = PropTypes.shape({
	cssClass: PropTypes.string,
	columns: PropTypes.number,
	useCallToAction: PropTypes.bool
})

StyleguideComponentParams.propTypes = {
	componentFactory: PropTypes.func.isRequired,
	rendering: PropTypes.shape({
		componentName: PropTypes.string.isRequired,
		fields: FieldsProps.isRequired,
		params: ParamsProps.isRequired
	}).isRequired,
	fields: FieldsProps.isRequired,
	params: ParamsProps.isRequired
}

export default StyleguideComponentParams
