import React from 'react';
import Route from './Route';
import Layout from '../Layout';

const Home = ({ navigation }) => (
  <Route path="/" render={({ data }) => <Layout rendering={data} navigation={navigation} />} />
);

export default Home;
