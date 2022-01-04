import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react-native';
import PropTypes from 'prop-types';
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

/**
 * Demonstrates usage of a custom content field type within JSS.
 * See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
 * for the definition of the structure of the custom field. This code is just for display.
 * @returns {JSX.Element} component
 */
const StyleguideFieldUsageCustom = ({ fields, rendering }) => (
  <StyleguideSpecimen fields={fields} rendering={rendering}>
    {/* Because the integer field is essentially text, we can render it with the Text helper */}
    <Text field={fields.customIntField} />
  </StyleguideSpecimen>
);

const FieldsProps = PropTypes.shape({
  heading: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  description: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  customIntField: PropTypes.shape({
    value: PropTypes.number,
    editable: PropTypes.number,
  }),
});

StyleguideFieldUsageCustom.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideFieldUsageCustom;
