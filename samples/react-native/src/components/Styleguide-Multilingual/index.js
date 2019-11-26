import React from 'react'
import { View, Text } from 'react-native'
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'
import styles from './styles'

const StyleguideMultilingual = ({ rendering, fields, switchLanguage }) => {
	return (
		<StyleguideSpecimen rendering={rendering} fields={fields}>
			<View>
				<Text style={styles.lang} onPress={() => switchLanguage('en')}>Switch to en</Text>
				<Text style={styles.lang} onPress={() => switchLanguage('da-DK')}>Switch to da-DK</Text>
			</View>
		</StyleguideSpecimen>
	)
}

export default StyleguideMultilingual
