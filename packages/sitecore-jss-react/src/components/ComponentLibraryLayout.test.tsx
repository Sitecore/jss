/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ComponentLibraryLayout } from './ComponentLibraryLayout';
import { getTestLayoutData } from '../test-data/component-editing-data';
import { ComponentFactory } from './sharedTypes';
import { SitecoreContext } from './SitecoreContext';
import { RichText } from './RichText';
import { Text } from './Text';
import { Placeholder } from '..';
import { COMPONENT_LIBRARY_READY_MESSAGE } from '@sitecore-jss/sitecore-jss/component-library';
import { beforeEach } from 'node:test';

describe('<ComponentLibraryLayout />', () => {
  const postMessageSpy = sinon.spy(global.window, 'postMessage');
  let rendered = mount(<div />);

  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC>();

    const ContentBlock: React.FC<{
      [prop: string]: unknown;
      fields?: { content: { value: string }; heading: { value: string } };
    }> = (props) => (
      <div className="test">
        <RichText field={props.fields?.content} />
        <Placeholder name="inner" rendering={props.rendering} />
      </div>
    );

    const InnerBlock: React.FC<{
      [prop: string]: unknown;
      fields?: { text: { value: string } };
    }> = (props) => (
      <div className="inner">
        <Text field={props.fields?.text} />
      </div>
    );

    components.set('ContentBlock', ContentBlock);
    components.set('InnerBlock', InnerBlock);

    return components.get(componentName) || null;
  };

  it('should render', () => {
    const basicPage = getTestLayoutData();
    rendered = mount(
      <SitecoreContext componentFactory={componentFactory}>
        <ComponentLibraryLayout {...basicPage.layoutData} />
      </SitecoreContext>
    );

    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div></div></div></main>',
      ].join('')
    );
  });

  it('should render component with placeholders', () => {
    const placeholderPage = getTestLayoutData(true);
    const rendered = mount(
      <SitecoreContext componentFactory={componentFactory}>
        <ComponentLibraryLayout {...placeholderPage.layoutData} />
      </SitecoreContext>
    );

    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div>',
        '<div class="inner">',
        'Its an inner component',
        '</div></div></div>',
        '</main>',
      ].join('')
    );
  });

  it('should fire component:ready event', () => {
    const basicPage = getTestLayoutData();
    const rendered = mount(
      <SitecoreContext componentFactory={componentFactory}>
        <ComponentLibraryLayout {...basicPage.layoutData} />
      </SitecoreContext>
    );

    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div></div></div></main>',
      ].join('')
    );

    expect(
      postMessageSpy
        .getCalls()
        .some(
          (call) => JSON.stringify(call.args[0]) === JSON.stringify(COMPONENT_LIBRARY_READY_MESSAGE)
        )
    ).to.be.true;
  });

  it('should update root component', async () => {
    const basicPage = getTestLayoutData();
    const rendered = mount(
      <SitecoreContext componentFactory={componentFactory}>
        <ComponentLibraryLayout {...basicPage.layoutData} />
      </SitecoreContext>
    );

    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div></div></div></main>',
      ].join('')
    );
    // jsdom performs postMessage without origin. We work around, ugly (https://github.com/jsdom/jsdom/issues/2745)
    // jsdom also doesn't consider `new MessageEvent()` to be of class Event - so we go very much around to get it working
    const updateEvent = document.createEvent('Event');
    updateEvent.initEvent('message', false, true);
    (updateEvent as any).origin = window.location.origin;
    (updateEvent as any).data = {
      name: 'component:update',
      uid: 'test-content',
      field: { content: { value: 'new content!' } },
    };
    await window.dispatchEvent(updateEvent);

    rendered.update();
    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        'new content!',
        '</div></div></div></main>',
      ].join('')
    );
  });

  it('should update nested component', async () => {
    const placeholderPage = getTestLayoutData(true);
    const rendered = mount(
      <SitecoreContext componentFactory={componentFactory}>
        <ComponentLibraryLayout {...placeholderPage.layoutData} />
      </SitecoreContext>
    );
    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div>',
        '<div class="inner">',
        'Its an inner component',
        '</div></div></div>',
        '</main>',
      ].join('')
    );
    // jsdom performs postMessage without origin. We work around, ugly (https://github.com/jsdom/jsdom/issues/2745)
    // jsdom also doesn't consider `new MessageEvent()` to be of class Event - so we go very much around to get it working
    const updateEvent = document.createEvent('Event');
    updateEvent.initEvent('message');
    (updateEvent as any).origin = window.location.origin;
    (updateEvent as any).data = {
      name: 'component:update',
      uid: 'test-inner',
      field: { text: { value: 'new inner content!' } },
    };
    await window.dispatchEvent(updateEvent);

    rendered.update();

    expect(rendered.html()).to.equal(
      [
        '<main><div id="editing-component">',
        '<div class="test"><div>',
        '<p>This is a live set of examples of how to use JSS</p>\n',
        '</div>',
        '<div class="inner">',
        'new inner content!',
        '</div></div></div>',
        '</main>',
      ].join('')
    );
  });
});
