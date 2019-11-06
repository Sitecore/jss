import React from 'react';
import { View } from 'react-native';
import { Text } from '@sitecore-jss/sitecore-jss-react-native';
import PropTypes from 'prop-types';

import styles from './styles'
import { FieldShape } from '../../common/shape'
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

StyleguideFieldUsageText.propTypes = {
	fields: PropTypes.shape({
		heading: FieldShape,
		sample: FieldShape,
		sample2: FieldShape
	})
}

export default StyleguideFieldUsageText


// import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-react';
// import StyleguideSpecimen from '../Styleguide-Specimen';

// /**
//  * Demonstrates usage of a Text content field within JSS.
//  * Text fields are HTML encoded by default.
//  */
// const StyleguideFieldUsageText = (props) => (
// 	<StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-text">
// 		{/* Basic use of a text field. No wrapper. */}
// 		<Text field={props.fields.sample} />

// 		{/* Advanced usage of text field. Specifies a wrapper tag, turns off Sitecore editing, supports raw HTML, and has a CSS class on the wrapper */}
// 		<Text
// 			field={props.fields.sample2}
// 			tag="section"
// 			editable={false}
// 			encode={false}
// 			className="font-weight-bold"
// 			data-sample="other-attributes-pass-through"
// 		/>

// 		{/*
//       Use this API when you need direct programmatic access to a field as a variable.
//       Note: editing such a value in Experience Editor is not possible, and direct field
//       editing must be used to edit a value emitted like this (the pencil icon when the rendering
//       is selected in xEditor)
//     */}
// 		<div>Raw value (not editable): {getFieldValue(props.fields, 'sample')}</div>
// 	</StyleguideSpecimen>
// );

// export default StyleguideFieldUsageText;
