import React from "react";
import PropTypes from "prop-types";
import { Text, RichText, Image } from "@sitecore-jss/sitecore-jss-react";

const Welcome = ({ fields, copyright }) => (
  <div id="CenterColumn">
    <div id="InnerCenter">
      <div id="Header">
        <Image media={fields.logoImage} id="scLogo" />
      </div>
      <div id="Content">
        <div id="LeftContent">
          <Text tag="h1" className="contentTitle" field={fields.title} />
          <RichText className="contentDescription" field={fields.text} />
        </div>
      </div>
      <div id="Footer">
        <hr className="divider" />
        {copyright}
      </div>
    </div>
  </div>
);

Welcome.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string
    }),
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string
    }),
    logoImage: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string
      }),
      editable: PropTypes.string
    })
  }),
  copyright: PropTypes.string
};

Welcome.defaultProps = {
  copyright: "Copyright Sitecore A/S"
};

export default Welcome;
