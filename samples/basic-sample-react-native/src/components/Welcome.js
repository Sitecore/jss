import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, Text as NativeText } from 'react-native';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { images } from 'static-assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: null,
    flex: 1,
  },
  logoImage: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
  },
  richTextContainer: {
    margin: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    marginVertical: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

const richTextStyles = StyleSheet.create({
  p: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const Welcome = ({ fields, copyright }) => (
  <View style={styles.container}>
    <ImageBackground
      source={images['/assets/img/banner.jpg']}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <Image media={fields.logoImage} style={styles.logoImage} />
    </ImageBackground>
    <View>
      <Text style={styles.title} field={fields.title} />
      <RichText style={styles.richTextContainer} field={fields.text} stylesheet={richTextStyles}>
        {fields.text.editable}
      </RichText>
    </View>
    <View style={styles.footer}>
      <NativeText>{copyright}</NativeText>
    </View>
  </View>
);

Welcome.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.object,
    text: PropTypes.object,
    logoImage: PropTypes.object,
  }),
  copyright: PropTypes.string,
};

Welcome.defaultProps = {
  copyright: 'Copyright Sitecore A/S',
};

export default Welcome;
