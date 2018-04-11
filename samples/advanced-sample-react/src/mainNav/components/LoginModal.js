import React from 'react';
import { translate } from 'react-i18next';
import { Modal, Button, Alert, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { commonComponent } from '../../enhancers';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onHide() {
    this.setState({
      username: '',
      password: '',
    });
    if (this.props.onHide) this.props.onHide();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.username, this.state.password, this.props.currentRoute);
    } else {
      this.onHide();
    }
  };

  render() {
    const { t, ...props } = this.props;

    return (
      <Modal show={props.show} onHide={this.onHide} dialogClassName="custom-modal">
        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{t('Login')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.loginFailed && <Alert bsStyle="danger">{t('LoginFailed')}</Alert>}
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>{t('Username')}</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>{t('Password')}</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={!this.validateForm()} type="submit">
              {t('Login')}
            </Button>
            <Button onClick={props.onHide}>{t('Cancel')}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default translate()(commonComponent(LoginModal));
