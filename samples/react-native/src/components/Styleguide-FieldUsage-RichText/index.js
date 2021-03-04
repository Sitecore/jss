import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RichText } from '@sitecore-jss/sitecore-jss-react-native';

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

const StyleguideFieldUsageRichText = ({ fields, rendering }) => (
  <StyleguideSpecimen fields={fields} rendering={rendering}>
    <View>
      <RichText field={fields.sample} />
      <RichText field={fields.sample2} />
    </View>
  </StyleguideSpecimen>
);

const FieldsProps = PropTypes.shape({
  sample: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  sample2: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
});

StyleguideFieldUsageRichText.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideFieldUsageRichText;
