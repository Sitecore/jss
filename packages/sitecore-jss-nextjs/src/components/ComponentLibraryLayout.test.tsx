import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ComponentLibraryLayout } from './ComponentLibraryLayout';
import { spy, stub } from 'sinon';
import componentLayoutData from '../test-data/component-editing-data';

// must make TypeScript happy with `global` variable modification
interface CustomWindow {
  [key: string]: unknown;
  dispatchEvent: unknown;
}

interface Global {
  window: CustomWindow | undefined;
}

declare const global: Global;

describe('<ComponentLibraryLayout />', () => {
  const eventStub = stub();
  const testLayoutData = componentLayoutData.layoutData;
  global.window = {
    dispatchEvent: eventStub,
  };

  it('should render', () => {
    const rendered = mount(<ComponentLibraryLayout {...testLayoutData} />);

    expect(rendered.html()).to.equal(
      [
        '<p>This is a live set of examples of how to use JSS. For more information on using JSS',
        'please see <a href="https://jss.sitecore.com" target="_blank" rel="noopener noreferrer">the documentation</a>.',
        '</p>\r\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\r\n'',
      ].join('')
    );
  });

  it('should fire component:status event', () => {
    const effectSpy = spy(React, 'useEffect');
    mount(<ComponentLibraryLayout {...testLayoutData} />);
    expect(effectSpy.called).to.be.true;
    expect(eventStub.called).to.be.true;
  });
});
