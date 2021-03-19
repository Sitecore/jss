import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { RichText } from '@sitecore-jss/sitecore-jss-react-native';

/**
 * This is a single tab within the tabs sample component. These are added to the tabs placeholder.
 * @returns {JSX.Element} component
 */
const StyleguideLayoutTabsTab = ({ fields }) => (
  <View>
    <RichText field={fields.content} />
  </View>
);

const FieldsProps = PropTypes.shape({
  title: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  content: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
});

StyleguideLayoutTabsTab.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideLayoutTabsTab;
