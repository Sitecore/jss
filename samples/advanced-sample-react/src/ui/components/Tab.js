import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder, Text } from '@sitecore-jss/sitecore-jss-react';
import { Tab as ReactTab } from 'react-bootstrap';

const Tab = ({ fields, rendering, sitecoreContext, ...otherProps }) => (
  <ReactTab.Pane
    eventKey={fields.title ? fields.title.value : ''}
    style={sitecoreContext.pageEditing ? { display: 'block', opacity: 100 } : {}}
  >
    {sitecoreContext.pageEditing && fields.title ? <Text field={fields.title} tag="h3" /> : ''}
    <Placeholder name="tab" rendering={rendering} {...otherProps} />
  </ReactTab.Pane>
);

Tab.propTypes = {
  style: PropTypes.object,
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
  rendering: PropTypes.object,
  sitecoreContext: PropTypes.object,
};

export default commonComponent(Tab);
