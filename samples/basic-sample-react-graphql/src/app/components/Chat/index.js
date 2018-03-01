import React from "react";
import { compose } from "react-apollo";
import { Text } from "@sitecore-jss/sitecore-jss-react";
import GraphQLData from "../../../../lib/GraphQL/GraphQLData";
import { Datasource, ChatSubscription, SendMessage } from "./Chat.graphql";
import ChatUsername from "./ChatUsername";
import ChatUI from "./ChatUI";

// A simple chat component which uses GraphQL subscriptions and mutations
// NOTE: this is a very simple example of real-time data with GraphQL,
// and not a production ready chat system.

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // the chat buffer stores chat messages as they come in
      chatBuffer: [],
      // your username in chat
      username: null
    };

    this.onChat = this.onChat.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  // Sets your username. Callback from ChatUsername component.
  setUsername(username) {
    this.setState({ username: username });
  }

  // Sends a new chat message as a GraphQL mutation. Note that mutations
  // are provided as a function prop that returns a promise.
  // We do not need to wait on the promise, because the new chat message will come back
  // over our subscription link for updating that way.
  onChat(message) {
    this.props.sendMutation({
      variables: { user: this.state.username, message: message }
    });
  }

  // when the component gets new props that means the GraphQL subscription has fired a new chat message
  // which we want to push into our chat buffer to display the new message
  componentWillReceiveProps(newProps) {
    this.setState({
      chatBuffer: [...this.state.chatBuffer, newProps.chatSubscription.chat]
    });
  }

  render() {
    // destructure props for cleaner local variables
    // We're using nested destructuring here which allows us to expose local variables from child objects;
    // so 'chat' will end up being 'this.props.chatSubscription.chat' for example below.
    const {
      chatSubscription: { chat, loading, error },
      data: { datasource }
    } = this.props;
    const { chatBuffer, username } = this.state;

    if (this.props.data.loading) return <span>Loading...</span>;
    if (error)
      return (
        <span>Error loading component. {chatSubscription.error.message}</span>
      );

    // render component
    return (
      <div>
        <div id="Header" />
        <div id="Content">
          <div id="LeftContent">
            {/* We're reading the title of the page from a datasource item */}
            <Text
              tag="h1"
              className="contentTitle"
              field={datasource.title.jss}
            />

            {/* If we don't have a username, show the UI to enter one; otherwise show the chat window */}
            {username === null && (
              <ChatUsername setUsername={this.setUsername} />
            )}
            {username !== null && (
              <ChatUI
                username={username}
                chatBuffer={chatBuffer}
                onChat={this.onChat}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// The `compose` function enables you to compose multiple higher order components
// with a nice syntax. Note that composition occurs in _reverse_ order; so the subscription
// is first. This is important to avoid bad things happening to your component state.
//
// Composition enables you to make more than one GraphQL query, mutation, or subscription from the same component.
// It also enables state management like Redux (e.g. you'd add `connect()` to the composition to use Redux)
export default compose(
  // we need the title from the datasource item. With no name set, this will become the 'data' prop by default.
  GraphQLData(Datasource),
  // we need a GraphQL mutation to send new chat messages. The 'name' sets the name of the prop we'll receive.
  GraphQLData(SendMessage, { name: "sendMutation" }),
  // we need a GraphQL subscription to get pushed new chat messages. The 'name' sets the name of the prop we receive.
  GraphQLData(ChatSubscription, { name: "chatSubscription" })
)(Chat);
