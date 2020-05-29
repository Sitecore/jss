import React from 'react';
import { Layout } from 'antd';
import Footer from 'components/Footer';
const Header = Layout.Header;

const NotFound = (props) => (
  <div id="app-wrap">
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-12 pt-5 pb-5">
          <h1>Page not found</h1>
          <p>
            <a href="/">JSS Docs Home</a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
