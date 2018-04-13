import React from 'react';

// the UI for the chat system when you're signed in
// If you're unfamiliar with React forms handling, see https://reactjs.org/docs/forms.html

class ChatUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.onChat = this.onChat.bind(this);
  }

  updateMessage(event) {
    this.setState({ message: event.target.value });
  }

  // When you send a chat message we call back to the parent component
  // with props.onChat(), then clear the chat box as we've sent the message
  onChat(e) {
    e.preventDefault();
    this.props.onChat(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    const { username, chatBuffer } = this.props;

    return (
      <form onSubmit={this.onChat}>
        <fieldset>
          <legend>Chat</legend>
          {chatBuffer.map((chatLine, key) => (
            <div key={key}>
              <strong>{chatLine.user}: </strong> {chatLine.message}
            </div>
          ))}
          {chatBuffer.length === 0 && (
            <div>
              <strong>No messages since you joined the chat</strong>
            </div>
          )}

          <hr />

          <label htmlFor="message">{username}:</label>
          <input type="text" id="message" value={message} onChange={this.updateMessage} />
          <button type="submit">Send</button>
        </fieldset>
      </form>
    );
  }
}

export default ChatUI;
