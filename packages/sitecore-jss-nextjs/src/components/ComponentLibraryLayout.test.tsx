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
        '<code type="text/sitecore" chrometype="field" class="scpm" kind="open">123</code>',
        '<a href="/lorem" class="my-link">ipsum</a>',
        '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
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
