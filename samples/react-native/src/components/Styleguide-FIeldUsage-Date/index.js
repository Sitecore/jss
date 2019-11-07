import React from 'react'
import { Text, View } from 'react-native'
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
				{/*
					Date helper supports a render props API to give you direct access to the JS Date object for formatting.
					IMPORTANT: the render prop is ignored when in Experience Editor mode to support inline editing.
				*/}
				<DateField field={fields.date} render={date => date.toUTCString()} />
			</View>
			<View style={styles.field}>
				<Text>Localized Date string (local timezone): </Text>
        <DateField field={fields.date} render={(date) => date.toLocaleDateString()} />
			</View>
			<View style={styles.field}>
				<Text>Localized DateTime string (local timezone): </Text>
				<DateField
					field={fields.dateTime}
					render={date => date.toLocaleString()}
				/>
			</View>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageDate
