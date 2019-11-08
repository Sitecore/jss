import React from 'react';
import { View, Text as NText } from 'react-native'
import { RichText } from '@sitecore-jss/sitecore-jss-react-native';

/**
 * This is a single tab within the tabs sample component. These are added to the tabs placeholder.
 * This component demonstrates conditionally altering rendering when in the Sitecore Experience Editor to improve
 * author experience.
 */
const StyleguideLayoutTabsTab = ({ fields, rendering }) => (
  <View>
		<RichText field={fields.content} />
  </View>
);

export default StyleguideLayoutTabsTab;
