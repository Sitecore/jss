import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Image } from '@sitecore-jss/sitecore-jss-react-native';
import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';

const StyleguideFieldUsageImage = ({ fields, rendering }) => (
  <StyleguideSpecimen fields={fields} rendering={rendering}>
    <Text>Plain image</Text>
    <Image media={fields.sample1} />
    <Text>Advanced image</Text>
    <Image media={fields.sample2} imageUrlParams={{ mw: 120, mh: 80 }} height="120" width="220" />
    <Text>Srcset image</Text>
    <Image media={fields.sample2} srcSet={[{ mw: 300 }, { mw: 100 }]} />
  </StyleguideSpecimen>
);

const FieldsProps = PropTypes.shape({
  heading: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  sample1: PropTypes.shape({
    value: PropTypes.shape({
      src: PropTypes.number,
      alt: PropTypes.string,
    }),
  }),
  sample2: PropTypes.shape({
    value: PropTypes.shape({
      src: PropTypes.number,
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
