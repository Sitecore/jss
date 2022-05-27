import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { default as env } from 'expo-constants';
import { Text, View, RefreshControl } from 'react-native';
import { layoutServiceFactory } from './lib/layout-service-factory';
import { populateTunnelUrl } from './lib/util';
import Layout from './Layout';

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

/**
 * Page wrapper. Performs data loading depends on current route
 */
class Route extends Component {
  state = {
    loading: true,
    lang: env.manifest.extra.defaultLanguage,
    route: null,
    error: null,
  };

  switchLanguage = (lang) => this.setState({ lang });

  loadData = () => {
    const { lang } = this.state;
    const { route } = this.props;

    const service = layoutServiceFactory.create();

    service
      .fetchLayoutData(route.name, lang)
      .then((data) => {
        let route = data.sitecore.route;

        // We are using tunnel
        if (env.manifest.extra.originalApiHost) {
          route = populateTunnelUrl(route);
        }

        this.setState({ route, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: err, loading: false });
      });
  };

  componentDidMount() {
    const { route } = this.props;

    route.name && this.loadData();
  }

  componentDidUpdate(_, prevState) {
    const { lang } = this.state;

    if (lang !== prevState.lang) this.loadData();
  }

  render() {
    const { navigation, route } = this.props;

    if (this.state.loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }

    if (this.state.error) {
      return (
        <View>
          <Text>{this.state.error.toString()}</Text>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={this.state.loading} onRefresh={this.loadData} />
        }
        contentContainerStyle={styles.contentContainer}
      >
        <Layout
          rendering={this.state.route}
          switchLanguage={this.switchLanguage}
          navigation={navigation}
        />
      </ScrollView>
    );
  }
}

Route.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Route;
