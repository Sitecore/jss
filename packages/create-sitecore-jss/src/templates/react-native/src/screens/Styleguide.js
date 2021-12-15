import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Route from './Route';
import Layout from '../Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

const Styleguide = ({ navigation }) => (
  <Route
    path="/styleguide"
    render={({ data, refreshControl, switchLanguage }) => (
      <ScrollView
        style={styles.container}
        refreshControl={refreshControl}
        contentContainerStyle={styles.contentContainer}
      >
        <Layout rendering={data} switchLanguage={switchLanguage} navigation={navigation} />
      </ScrollView>
    )}
  />
);

export default Styleguide;
