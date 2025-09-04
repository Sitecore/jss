import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, Placeholder } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { images } from 'static-assets';

const styles = StyleSheet.create({
  bgImage: {
    width: null,
  },
  logoImage: {
    margin: 20,
  },
});

const Layout = ({ rendering, navigation, ...otherProps }) => (
  <>
    <ImageBackground
      source={images['/assets/img/banner.jpg']}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image media={{ src: images['/assets/img/sc_logo.svg'] }} style={styles.logoImage} />
      </TouchableOpacity>
    </ImageBackground>
    <Placeholder name="jss-main" rendering={rendering} navigation={navigation} {...otherProps} />
  </>
);

export default Layout;
