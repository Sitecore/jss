import React from 'react'
import { View, Text } from 'react-native'

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'
import styles from './styles'

const StyleguideComponentParams = ({ fields, rendering, params }) => {
	const { cssClass, columns, useCallToAction } = params

	const colsArr = columns && [...Array(parseInt(columns))];

	console.log(params)

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

export default StyleguideComponentParams
