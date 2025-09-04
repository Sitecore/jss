import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Link } from '@sitecore-jss/sitecore-jss-react-native';

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';
import styles from './styles';

const StyleguideFieldUsageLink = ({ fields, rendering }) => (
  <StyleguideSpecimen fields={fields} rendering={rendering}>
    <View style={styles.field}>
      <Text>External link: </Text>
      <Link textStyle={styles.link} field={fields.externalLink} />
    </View>
    <View style={styles.field}>
      <Text>Email link: </Text>
      <Link textStyle={styles.link} field={fields.emailLink} />
    </View>
    <View style={styles.field}>
      <Text>The link component accepts params of its own:</Text>
      <Link
        textStyle={styles.link}
        field={fields.externalLink}
        showLinkTextWithChildrenPresent
        data-otherattributes="pass-through-to-anchor-tag"
      >
        <Text>Another text...</Text>
      </Link>
    </View>
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
  externalLink: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
  emailLink: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
});

StyleguideFieldUsageLink.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideFieldUsageLink;
