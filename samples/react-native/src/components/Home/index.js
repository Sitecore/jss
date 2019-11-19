import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Text as NativeText } from 'react-native';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { images } from 'static-assets';
import styles, { richTextStyles } from './styles'

const Home = ({ fields, copyright, navigation }) => (
	<View style={styles.container}>
		<ImageBackground
			source={images['/assets/img/banner.jpg']}
			style={styles.bgImage}
			resizeMode="cover"
		>
			<Image media={fields.logoImage} style={styles.logoImage} />
		</ImageBackground>
		<View style={styles.body}>
			<Text style={styles.title} field={fields.title} />
			<Text 
				onPress={() => navigation.navigate('Styleguide')}
				style={styles.styleguideLink}
				field={fields.styleguideLink}
			/>
			<RichText field={fields.text} stylesheet={richTextStyles}>
				{fields.text.editable}
			</RichText>
		</View>
		<View style={styles.footer}>
			<NativeText>{copyright}</NativeText>
		</View>
	</View>
);

Home.propTypes = {
	fields: PropTypes.shape({
		title: PropTypes.object,
		text: PropTypes.object,
		logoImage: PropTypes.object,
	}),
	copyright: PropTypes.string,
};

Home.defaultProps = {
	copyright: 'Copyright Sitecore A/S',
};

export default Home
