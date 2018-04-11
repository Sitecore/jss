/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import StepZilla from 'react-stepzilla';

// Workaround for https://github.com/newbreedofgeek/react-stepzilla/issues/54
class StepZillaPatched extends StepZilla {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    const buttons = node.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; ++i) {
      buttons[i].setAttribute('type', 'button');
    }
  }
}

export default StepZillaPatched;
