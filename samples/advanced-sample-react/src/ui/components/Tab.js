import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Tab as ReactTab } from 'react-bootstrap';

const Tab = ({ fields, rendering, sitecoreContext, ...otherProps }) =>
  (<ReactTab.Pane eventKey={fields.title ? fields.title.value : ''} style={sitecoreContext.pageEditing ? { display: 'block', opacity: 100 } : {}}>
    {sitecoreContext.pageEditing && fields.title ?
      <h3 dangerouslySetInnerHTML={{ __html: fields.title.editable }} />
      : ''}
    <Placeholder name="tab" rendering={rendering} {...otherProps} />
  </ReactTab.Pane>);

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
