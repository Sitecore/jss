import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { File } from '@sitecore-jss/sitecore-jss-react';

const FileLink = ({ fields }) => (
  <File field={fields.file} className="btn btn-info btn-lg" target="_blank" />
);

FileLink.propTypes = {
  fields: PropTypes.shape({
    file: PropTypes.shape({
      value: PropTypes.object,
      editable: PropTypes.string,
    }),
  }),
};

export default commonComponent(FileLink);
