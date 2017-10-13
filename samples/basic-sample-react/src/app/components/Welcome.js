import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@sitecore-jss/sitecore-jss-react';

const Welcome = ({ fields, copyright }) =>
  <div id="CenterColumn">
    <div id="InnerCenter">
      <div id="Header">
        <Image media={fields.logoImage} id="scLogo" />
      </div>
      <div id="Content">
        <div id="LeftContent">
          <h1 className="contentTitle"
            dangerouslySetInnerHTML={{ __html: fields.title.editable }} />
          <div className="contentDescription"
            dangerouslySetInnerHTML={{ __html: fields.text.editable }} />
        </div>
      </div>
      <div id="Footer">
        <hr className="divider" />
        {copyright}
      </div>
    </div>
  </div>;

Welcome.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    logoImage: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
      }),
      editable: PropTypes.string,
    }),
  }),
  copyright: PropTypes.string
};

Welcome.defaultProps = {
  copyright: "Copyright Sitecore A/S"
};

export default Welcome;
