import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, Placeholder } from '@sitecore-jss/sitecore-jss-react-native';
import Constants from 'expo-constants';
import { images } from '../assets/images';

const styles = StyleSheet.create({
  logoImage: {
    margin: 20,
    flex: 1,
  },
  layout: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});

const Layout = ({ rendering, navigation, ...otherProps }) => {
  return (
    <View style={styles.layout}>
      <ImageBackground source={images['/assets/img/banner.jpg']} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image media={{ src: images['/assets/img/sc_logo.png'] }} style={styles.logoImage} />
        </TouchableOpacity>
      </ImageBackground>
      <Placeholder name="<%- helper.getAppPrefix(appPrefix, appName) %>jss-main" rendering={rendering} navigation={navigation} {...otherProps} />
    </View>
  );
};

export default Layout;
