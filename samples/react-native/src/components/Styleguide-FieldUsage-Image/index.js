import React from 'react'
import { Text } from 'react-native'
import { Image } from '@sitecore-jss/sitecore-jss-react-native';
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

const StyleguideFieldUsageImage = ({ fields, rendering }) => {
	return (
		<StyleguideSpecimen fields={fields} rendering={rendering}>
			<Text>Plain image</Text>
			<Image media={fields.sample1} />
			<Text>Advanced image</Text>
			<Image media={fields.sample2} imageUrlParams={{ mw: 120, mh: 80 }} height="120" width="220" />
			<Text>Srcset image</Text>
			<Image
				media={fields.sample2}
				srcSet={[{ mw: 300 }, { mw: 100 }]}
			/>
		</StyleguideSpecimen>
	)
}

export default StyleguideFieldUsageImage
