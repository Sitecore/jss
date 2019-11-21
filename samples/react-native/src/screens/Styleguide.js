import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { Placeholder } from '@sitecore-jss/sitecore-jss-react-native';
import Route from './Route'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Styleguide = () => (
	<Route
		path='/styleguide'
		render={({ data, refreshControl }) =>
			<ScrollView
				style={styles.container}
				refreshControl={refreshControl}
				contentContainerStyle={styles.contentContainer}
			>
				<Placeholder name='jss-main' rendering={data} />
			</ScrollView>
		}
	/>
)

export default Styleguide
