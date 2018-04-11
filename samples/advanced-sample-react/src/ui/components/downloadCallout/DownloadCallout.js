import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import DownloadModal from 'ui/components/DownloadModal';

const DownloadCallout = (props) => (
  <div style={props.style}>
    <button
      className="btn btn-primary btn-lg"
      onClick={() => props.actions.showDownloadForm('/content/forms/download', props.language)}
    >
      <Text field={props.fields.linkText} tag="span" />
    </button>
    <DownloadModal
      loading={props.loading}
      data={props.data}
      show={props.show}
      onHide={() => props.actions.hideDownloadForm()}
    />
  </div>
);

DownloadCallout.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  show: PropTypes.bool,
  loading: PropTypes.bool,
  actions: PropTypes.object,
  language: PropTypes.string,
  fields: PropTypes.shape({
    linkText: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

DownloadCallout.styles = {};

export default commonComponent(DownloadCallout);
