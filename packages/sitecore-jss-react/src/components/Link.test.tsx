import React, { createRef } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Link, LinkField } from './Link';
import { generalLinkField as eeLinkData } from '../test-data/ee-data';

describe('<Link />', () => {
  it('should render nothing with missing field', () => {
    const field = (null as unknown) as LinkField;
    const rendered = mount(<Link field={field} />).children();
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = mount(<Link field={field} />);
    expect(rendered.html()).to.equal('');
  });

  it('should render editable with an editable value', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    const rendered = mount(<Link field={field} />);

    expect(rendered.html()).to.contain(field.editableFirstPart);
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
      editable: '<a href="/services" class="yo">Lorem</a>',
    };
    const rendered = mount(<Link field={field} editable={false} />).find('a');
    expect(rendered.html()).to.contain(field.value.href);
    expect(rendered.html()).to.contain(field.value.text);
  });

  it('should render with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const rendered = mount(<Link field={field} />).find('a');
    expect(rendered.html()).to.contain(field.href);
    expect(rendered.html()).to.contain(field.text);
  });

  it('should not add extra hash when linktype is anchor', () => {
    const field = {
      linktype: 'anchor',
      href: '#anchor',
      text: 'anchor link',
      anchor: 'anchor',
    };
    const rendered = mount(<Link field={field} />).find('a');
    expect(rendered.html()).to.contain(`href="${field.href}"`);
    expect(rendered.text()).to.equal(field.text);
  });

  it('should render ee HTML', () => {
    const field = {
      editableFirstPart: eeLinkData,
    };
    const rendered = mount(<Link field={field} />);
    expect(rendered.html()).to.contain('<input');
    expect(rendered.html()).to.contain('chrometype="field"');
  });

  it('should render all value attributes', () => {
    const field = {
      value: {
        href: '/lorem',
        anchor: 'foo',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
        querystring: 'foo=bar',
      },
    };
    const rendered = mount(<Link field={field} />).find('a');
    expect(rendered.html()).to.contain(
      `href="${field.value.href}?${field.value.querystring}#${field.value.anchor}"`
    );
    expect(rendered.html()).to.contain(`class="${field.value.class}"`);
    expect(rendered.html()).to.contain(`title="${field.value.title}"`);
    expect(rendered.html()).to.contain(`target="${field.value.target}"`);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
    };
    const rendered = mount(<Link field={field} id="my-link" accessKey="a" />).find('a');
    expect(rendered.html()).to.contain('id="my-link"');
    expect(rendered.html()).to.contain('accesskey="a"');
  });

  it('should render other attributes on wrapper span with other props provided with editable', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    const rendered = mount(<Link field={field} id="my-link" />);
    expect(rendered.html()).to.contain('id="my-link"');
  });

  it('should render with a ref to the anchor', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const ref = createRef<HTMLAnchorElement>();

    const c = mount(<Link field={field} ref={ref} id="my-link" />);

    const link = c.find('a');
    expect(ref.current?.id).to.equal(link.props().id);
  });

  it('should render field metadata component when metadata property is present', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'single-line',
      rawValue: 'Test1',
    };

    const field = {
      href: '/lorem',
      text: 'ipsum',
      metadata: testMetadata,
    };
    const rendered = mount(<Link field={field} />);

    expect(rendered.find('code')).to.have.length(2);
    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.contain(JSON.stringify(testMetadata));
  });
});
