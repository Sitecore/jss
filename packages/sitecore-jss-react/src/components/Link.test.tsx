import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Link } from './Link';
import { generalLinkField as eeLinkData } from '../testData/ee-data';

describe('<Link />', () => {
  it('should render nothing with missing field', () => {
    const field: any = null;
    const rendered = mount(<Link field={field} />).children();
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = mount(<Link field={field} />).children();
    expect(rendered).to.have.length(0);
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
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const rendered = mount(<Link field={field} />).find('a');
    expect(rendered.html()).to.contain(`href="${field.value.href}"`);
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
});
