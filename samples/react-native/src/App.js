import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Placeholder, SitecoreContext } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { getRouteData } from 'data-service';
import componentFactory from './componentFactory';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      route: null,
      error: null,
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    getRouteData('/')
      .then((data) => {
        this.setState({ route: data, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: err, loading: false });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
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
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    const refreshControl = (
      <RefreshControl refreshing={this.state.loading} onRefresh={this.loadData} />
    );
    return (
      <SitecoreContext componentFactory={componentFactory}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={refreshControl}
        >
          <Placeholder name="main" rendering={this.state.route} />
        </ScrollView>
      </SitecoreContext>
    );
  }
}

export default App;
