import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Placeholder } from '@sitecore-jss/sitecore-jss-react-native';

import StyleguideSpecimen from '../Styleguide-Specimen/Styleguide-Specimen';
import styles from './styles';

const StyleguideLayoutTabs = ({ rendering, fields }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const renderTab = (tab, index) => {
    const style = index === activeTabIndex ? styles.tabTitleActive : styles.tabTitle;

    return (
      <TouchableWithoutFeedback key={index} onPress={() => setActiveTabIndex(index)}>
        <Text style={style} field={tab.fields.title} />
      </TouchableWithoutFeedback>
    );
  };

  const render = (components, data, props) => (
    <>
      <View style={styles.tabs}>{data.map(renderTab)}</View>
      <Text style={styles.content} field={data[activeTabIndex].fields.content} />
    </>
  );

  const renderEmpty = (components) => <View>{components}</View>;

  return (
    <StyleguideSpecimen rendering={rendering} fields={fields}>
      <Placeholder
        rendering={rendering}
        name="jss-tabs"
        render={render}
        renderEmpty={renderEmpty}
      />
    </StyleguideSpecimen>
  );
};

const FieldsProps = PropTypes.shape({
  heading: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  description: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
});

StyleguideLayoutTabs.propTypes = {
  componentFactory: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    fields: FieldsProps.isRequired,
  }).isRequired,
  fields: FieldsProps.isRequired,
};

export default StyleguideLayoutTabs;
