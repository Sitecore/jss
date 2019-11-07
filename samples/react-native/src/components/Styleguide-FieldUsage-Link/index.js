import React from 'react'
import { View, Text } from 'react-native'
import { Link } from '@sitecore-jss/sitecore-jss-react-native'

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen'
import styles from './styles'

const StyleguideFieldUsageLink = ({ fields, rendering }) => {
	console.log(fields, rendering)
	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<View style={styles.field}>
				<Text>External link: </Text>
				<Link field={fields.externalLink} />
			</View>
			<View style={styles.field}>
				<Text>Email link: </Text>
				<Link field={fields.emailLink} />
			</View>
			<View style={styles.field}>
				<Text>The link component accepts params of its own:</Text>
				<Link
					field={fields.externalLink}
					showLinkTextWithChildrenPresent
					data-otherattributes="pass-through-to-anchor-tag"
				>
					<Text>Another text...</Text>
				</Link>
			</View>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageLink
