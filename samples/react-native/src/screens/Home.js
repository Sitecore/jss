import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react-native';
import Route from './Route'

const Home = ({ navigation }) => (
  <Route 
    path='/'
    render={({ data }) =>
      <Placeholder name='jss-main' rendering={data} navigation={navigation} />
    }
  />
);

export default Home
