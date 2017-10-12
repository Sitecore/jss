import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { spring, Motion, presets } from 'react-motion';
import { translate } from 'react-i18next';
import { commonComponent } from 'enhancers';
import { Button } from 'react-bootstrap';
import FormContent from './FormContent';
import LoadingIndicator from './LoadingIndicator';

const modalRoot = (typeof window !== 'undefined' && window.document) ? document.body : null;

class UIModal extends Component {
  static propTypes = {
    children: PropTypes.any,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    className: PropTypes.string,
    t: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
  };

  static scrollPositions = {};
  static hasVScroll = {};

  constructor(props) {
    super(props);
    this.el = document.createElement('div');

    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUpdate() {
    this.scrollPositions = { x: window.pageXOffset, y: window.pageYOffset };
    this.hasVScroll = { scroll: document.body.scrollHeight };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show && this.props.show) {
      this.node.focus();
      window.scroll(this.scrollPositions.x, this.scrollPositions.y);
      document.body.classList.add('modal-open');
      if (document.body.scrollHeight > this.hasVScroll.scroll) {
        document.body.style.paddingRight = '15px';
      }
    }

    if (!this.props.show) {
      document.body.classList.remove('modal-open');
      document.body.style = undefined;
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleDocumentKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.onHide();
    }
  }

  handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.onHide();
  }

  render() {
    let modalContent = null;
    if (this.props.data.fields) {
      modalContent = this.props.loading ?
        <LoadingIndicator size={32} /> :
        <FormContent fields={this.props.data.fields} />;
    }

    const { show } = this.props;

    return ReactDOM.createPortal(
      <div>
        {show ? (
          <Motion defaultStyle={{ x: 0 }} style={{ x: spring(show ? 0.5 : 0, presets.stiff) }}>
            {things => (
              <div role="button" tabIndex={0} onKeyDown={this.handleDocumentKeyDown} ref={(node) => { this.node = node; }} style={{ opacity: things.x }} className="modal-backdrop" />
            )}
          </Motion>
        ) : null}

        <Motion
          defaultStyle={{ marginTop: -350 }}
          style={{ marginTop: spring(show ? 1 : -350, presets.stiff) }}
        >
          {stuff => (
            <div // eslint-disable-line
              role="dialog"
              tabIndex={-1}
              className="modal"
              style={{ marginTop: stuff.marginTop, display: stuff.marginTop < -230 ? 'none' : 'block' }}
              onClick={this.handleDialogClick}
            >
              <div className={`modal-dialog ${this.props.className || 'modal-md'}`}>
                <div className="modal-content" role="document">
                  <div className="modal-header">
                    <Button className="close" onClick={this.props.onHide} data-dismiss="modal"><span aria-hidden="true">&times;</span></Button>
                    <h4 className="modal-title">{this.props.t('Download Form')}</h4>
                  </div>
                  <div className="modal-body">
                    {modalContent}
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                    <Button onClick={this.props.onHide} data-dismiss="modal">{this.props.t('Close')}</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Motion>
      </div>, this.el);
  }
}

export default translate()(commonComponent(UIModal));