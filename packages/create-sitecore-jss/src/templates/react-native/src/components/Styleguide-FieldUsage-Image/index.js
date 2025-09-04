import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Image } from '@sitecore-jss/sitecore-jss-react-native';
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

const StyleguideFieldUsageImage = ({ fields, rendering }) => (
  <StyleguideSpecimen fields={fields} rendering={rendering}>
    <Text>Plain image</Text>
    <Image media={fields.sample1} height="51" width="204" />
    <Text>Advanced image</Text>
    <Image media={fields.sample2} imageUrlParams={{ mw: 100, mh: 50 }} height="50" width="92" />
  </StyleguideSpecimen>
);

const FieldsProps = PropTypes.shape({
  heading: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  sample1: PropTypes.shape({
    value: PropTypes.shape({
      // This will be a number in disconnected mode (see dataService.disconnected.js), string in connected
      src: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      alt: PropTypes.string,
    }),
  }),
  sample2: PropTypes.shape({
    value: PropTypes.shape({
      // This will be a number in disconnected mode (see dataService.disconnected.js), string in connected
      src: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      alt: PropTypes.string,
    }),
  }),
});

StyleguideFieldUsageImage.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideFieldUsageImage;
