import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { translate } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import FormContent from './FormContent';
import LoadingIndicator from './LoadingIndicator';

const DownloadModal = ({ t, ...props }) => {
  let modalContent = null;
  if (props.data.fields) {
    modalContent = props.loading ? (
      <LoadingIndicator size={32} />
    ) : (
      <FormContent fields={props.data.fields} />
    );
  }

  return (
    <Modal show={props.show} onHide={props.onHide} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">{t('Download Form')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{t('Close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

DownloadModal.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  show: PropTypes.bool,
  loading: PropTypes.bool,
  onHide: PropTypes.func,
  t: PropTypes.func,
};

export default translate()(commonComponent(DownloadModal));
