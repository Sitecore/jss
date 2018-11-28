/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';

import { generalLinkField as eeLinkData } from '../test/data/field-data-EE-on';
import { Link } from './Link';

describe('<Link />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Link);
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });

  it('should render nothing with missing editable and value', () => {
    const props = {
      field: null,
    };
    // Need to mock console.error as Vue will log an error for the null "field" prop
    // that is marked as an Object.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Link, { context: { props } });
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });

  it('should render editable with an editable value', () => {
    const props = {
      field: {
        editableFirstPart: '<a href="/services" class="yo">Lorem',
        editableLastPart: '</a>',
      },
    };
    const rendered = mount(Link, { context: { props } }).find('.sc-link-wrapper > a');
    expect(rendered.html()).toContain(props.field.editableFirstPart);
  });

  it('should render value with editing explicitly disabled', () => {
    const props = {
      field: {
        value: {
          href: '/lorem',
          text: 'ipsum',
        },
        editableFirstPart: '<a href="/services" class="yo">Lorem',
        editableLastPart: '</a>',
      },
      editable: false,
    };

    const rendered = mount(Link, { context: { props } }).find('a');
    expect(rendered.attributes().href).toBe(props.field.value.href);
    expect(rendered.html()).toContain(props.field.value.text);
  });

  it('should render with href directly on provided field', () => {
    const props = {
      field: {
        href: '/lorem',
        text: 'ipsum',
      },
    };
    const rendered = mount(Link, { context: { props } }).find('a');
    expect(rendered.attributes().href).toBe(props.field.href);
    expect(rendered.text()).toBe(props.field.text);
  });

  it('should render ee HTML', () => {
    const props = {
      field: {
        editableFirstPart: eeLinkData,
        editableLastPart: '</a>',
      },
    };
    const rendered = mount(Link, { context: { props } }).find('span');
    expect(rendered.html().indexOf('<input')).toBeGreaterThan(-1);
    expect(rendered.html().indexOf('chrometype="field"')).toBeGreaterThan(-1);
  });

  it('should render all value attributes', () => {
    const props = {
      field: {
        value: {
          href: '/lorem',
          text: 'ipsum',
          class: 'my-link',
          title: 'My Link',
          target: '_blank',
        },
      },
    };
    const rendered = mount(Link, { context: { props } }).find('a');
    const renderedAttrs = rendered.attributes();
    // note: order of comparison is important for `toMatchObject` as renderedAttrs won't fully match props.field.value
    expect(props.field.value).toMatchObject(renderedAttrs);
  });

  it('should render other attributes with other props provided', () => {
    const props = {
      field: {
        value: {
          href: '/lorem',
          text: 'ipsum',
        },
      },
    };
    const attrs = {
      id: 'my-link',
      disabled: true,
    };
    const rendered = mount(Link, { context: { props, attrs } }).find('a');
    const renderedAttrs = rendered.attributes();
    expect(renderedAttrs.id).toBe(attrs.id);
    expect(renderedAttrs.disabled).toBe('disabled');
  });

  it('should render other attributes on wrapper span with other props provided with editable', () => {
    const props = {
      field: {
        editableFirstPart: '<a href="/services" class="yo">Lorem',
        editableLastPart: '</a>',
      },
    };
    const attrs = {
      id: 'my-link',
    };
    const rendered = mount(Link, { context: { props, attrs } }).find('span.sc-link-wrapper');
    expect(rendered.attributes().id).toBe(attrs.id);
  });
});
