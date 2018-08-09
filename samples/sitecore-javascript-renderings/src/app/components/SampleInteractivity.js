import React from 'react';

// Sample using some basic client-side interactivity to demonstrate
// that a JS rendering is a fully-capable React app. While it cannot render a JSS app,
// it can use any React libraries, such as Redux, react-router, etc to implement a dynamic
// app within the JS rendering.
export default class SampleInteractivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
    };

    this.addClick = this.addClick.bind(this);
  }

  addClick() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return (
      <div>
        <h2>Interactivity demo</h2>
        <p>Full client-side React capabilities can be used in JS renderings.</p>
        <p>
          <em>Note:</em> Interactivity will not work until the page is saved if you add this
          rendering in Experience Editor.
        </p>
        <button onClick={this.addClick}>Click me! (ctrl-click in EE)</button>
        {this.state.clicks > 0 && <div>You have clicked {this.state.clicks} times!</div>}
      </div>
    );
  }
}
