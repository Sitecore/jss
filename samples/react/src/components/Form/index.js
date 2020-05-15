import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { sitecoreApiHost, sitecoreApiKey } from '../../temp/config';

const JssForm = ({ fields, history }) => (
  <Form
    form={fields}
    sitecoreApiHost={sitecoreApiHost}
    sitecoreApiKey={sitecoreApiKey}
    onRedirect={(url) => history.push(url)}
  />
);

export default withRouter(JssForm);