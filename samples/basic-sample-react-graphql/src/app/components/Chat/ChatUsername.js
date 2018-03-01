import React from "react";

// The chat UI that accepts your username when you're signing in to chat
// If you're unfamiliar with React forms handling, see https://reactjs.org/docs/forms.html

class ChatUsername extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  setUsername(e) {
    e.preventDefault();
    this.props.setUsername(this.state.username);
  }

  render() {
    const { username } = this.state;

    return (
      <form onSubmit={this.setUsername}>
        <fieldset>
          <legend>Chat</legend>

          <label htmlFor="username">Who are you?</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.updateUsername}
          />
          <button type="submit">Sign On</button>
        </fieldset>
      </form>
    );
  }
}

export default ChatUsername;
