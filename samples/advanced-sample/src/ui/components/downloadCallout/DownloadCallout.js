import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
// import DownloadModal from 'ui/components/DownloadModal';
// temp workaround until issue with react-modal and react 16 is fixed
// https://github.com/react-bootstrap/react-bootstrap/issues/2812
import DownloadModal from 'ui/components/DownloadModalTemp';

const DownloadCallout = props => (
  <div style={props.style}>
    <button className="btn btn-primary btn-lg" onClick={() => props.actions.showDownloadForm('/content/forms/download', props.language)}><span dangerouslySetInnerHTML={{ __html: props.fields.linkText.editable }} /></button>
    {
    (typeof window !== 'undefined' && window.document) ?
      <DownloadModal loading={props.loading} data={props.data} show={props.show} onHide={() => props.actions.hideDownloadForm()} /> :
      null
    }  
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

DownloadCallout.styles = {
};

export default commonComponent(DownloadCallout);
