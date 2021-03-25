import React from 'react';
import PropTypes from 'prop-types';
import { View, Text as NativeText } from 'react-native';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react-native';
import styles, { richTextStyles } from './styles';

const Home = ({ fields, copyright, navigation }) => (
  <View style={styles.container}>
    <View style={styles.body}>
      <Text style={styles.title} field={fields.title} />
      <Text
        onPress={() => navigation.navigate('Styleguide')}
        style={styles.styleguideLink}
        field={fields.styleguideLink}
      />
      <RichText field={fields.text} stylesheet={richTextStyles}>
        {fields.text.editable}
      </RichText>
    </View>
    <View style={styles.footer}>
      <NativeText>{copyright}</NativeText>
    </View>
  </View>
);

Home.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.object,
    text: PropTypes.object,
  }),
  copyright: PropTypes.string,
};

Home.defaultProps = {
  copyright: 'Copyright Sitecore A/S',
};

export default Home;
