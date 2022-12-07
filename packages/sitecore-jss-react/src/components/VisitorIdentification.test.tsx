/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { VisitorIdentification, resetEmittedVI } from './VisitorIdentification';
import { SitecoreContextReactContext } from './SitecoreContext';
import { spy } from 'sinon';

describe('<VisitorIdentification />', () => {
  const defaultContext = { visitorIdentificationTimestamp: 21102015 };

  const mockContext = (context) => {
    return {
      context: context,
      setContext: spy(),
    };
  };

  afterEach(() => {
    const script = document.head.getElementsByTagName('script')[0];
    const meta = document.head.getElementsByTagName('meta')[0];
    if (script) {
      document.head.removeChild(script);
    }
    if (meta) {
      document.head.removeChild(meta);
    }
    resetEmittedVI();
  });

  it('should render in <head>', () => {
    const rendered = mount(
      <SitecoreContextReactContext.Provider value={mockContext(defaultContext)}>
        <VisitorIdentification />
      </SitecoreContextReactContext.Provider>
    );
    expect(document.head.childElementCount).to.be.equal(2);
    const script = document.head.getElementsByTagName('script')[0];
    const meta = document.head.getElementsByTagName('meta')[0];
    expect(script).to.not.be.equal(undefined);
    expect(meta).to.not.be.equal(undefined);
    expect(script.src).to.equal('/layouts/system/VisitorIdentification.js');
    expect(script.defer).to.be.equal(false);
    expect(rendered.html()).to.be.null;
  });

  it('should render script with defer when defer is enabled', async () => {
    const rendered = mount(
      <SitecoreContextReactContext.Provider value={mockContext(defaultContext)}>
        <VisitorIdentification defer={true} />
      </SitecoreContextReactContext.Provider>
    );
    const script = document.getElementsByTagName('script')[0];
    expect(script).to.not.be.equal(undefined);
    expect(script.defer).to.equal(true);
    expect(rendered.html()).to.be.null;
  });

  it('should not re-render after rendering once', async () => {
    mount(
      <SitecoreContextReactContext.Provider value={mockContext(defaultContext)}>
        <VisitorIdentification />
      </SitecoreContextReactContext.Provider>
    );
    const script = document.getElementsByTagName('script')[0];
    const meta = document.head.getElementsByTagName('meta')[0];
    expect(script).to.not.be.equal(undefined);
    expect(meta).to.not.be.equal(undefined);
    document.head.removeChild(script);
    document.head.removeChild(meta);
    mount(
      <SitecoreContextReactContext.Provider value={mockContext(defaultContext)}>
        <VisitorIdentification />
      </SitecoreContextReactContext.Provider>
    );
    expect(document.head.childElementCount).to.equal(0);
  });

  it('should not render when visitorIdentificationTimestamp is missing from context', async () => {
    const rendered = mount(
      <SitecoreContextReactContext.Provider value={mockContext({})}>
        <VisitorIdentification />
      </SitecoreContextReactContext.Provider>
    );
    expect(document.head.childElementCount).to.equal(0);
    expect(rendered.html()).to.be.null;
  });
});
