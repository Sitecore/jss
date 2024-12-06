import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

const originalLog = console.error;

// Suppress deprecation error, since there is no react 18 upgrade for Enzyme
console.error = (msg) => {
  if (
    typeof msg === 'string' &&
    msg.includes('ReactDOM.render is no longer supported in React 18')
  ) {
    return;
  }

  originalLog(msg);
};
