import React from 'react';
import { Placeholder, Text } from '@sitecore-jss/sitecore-jss-react';

/**
 * Represents a category of styleguide specimens within the Styleguide-Layout.
 * Usage examples are added to the `styleguide-section` placeholder that this
 * exposes.
 */
const StyleguideSection = (props) => (
  <div className="pt-3" id={`i${props.rendering.uid.replace(/[{}]/g, '')}`}>
    <Text className="border-bottom" field={props.fields.heading} tag="h3" />
    <Placeholder name="jss-styleguide-section" rendering={props.rendering} />
  </div>
);

export default StyleguideSection;
