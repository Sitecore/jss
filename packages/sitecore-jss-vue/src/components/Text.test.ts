/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';

import { textField as eeTextData } from '../test/data/field-data-EE-on';
import { Text } from './Text';

describe('<Text />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Text);
    expect(rendered.element.innerHTML).toBe(undefined);
    errorSpy.mockRestore();
  });

  it('should render nothing with missing editable and value', () => {
    const props: { field: null } = { field: null };
    // Need to mock console.error as Vue will log an error for the null "field" prop
    // that is marked as an Object.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Text, { props });
    expect(rendered.element.innerHTML).toBe(undefined);
    errorSpy.mockRestore();
  });

  it('should render nothing with empty value', () => {
    const props = {
      field: {
        value: '',
      },
    };
    // Need to mock console.error as Vue will log an error for the null "field" prop
    // that is marked as an Object.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Text, { context: { props } });
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });

  it('should render editable with editable value', () => {
    const props = {
      field: {
        value: 'value',
        editable: 'editable',
      },
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.editable);
  });

  it('should render value with editing explicitly disabled', () => {
    const props = {
      field: {
        value: 'value',
        editable: 'editable',
      },
      editable: false,
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should encode values with editing explicitly disabled', () => {
    const props = {
      field: {
        value: 'value < >',
      },
      editable: false,
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.html().indexOf('&lt; &gt;')).toBeGreaterThan(-1);
  });

  it('should render value with with just a value', () => {
    const props = {
      field: {
        value: 'value',
      },
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render number value', () => {
    const props = {
      field: {
        value: 1.23,
      },
    };
    const rendered = mount(Text, { context: { props } }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value.toString());
  });

  it('should render zero number value', () => {
    const props = {
      field: {
        value: 0,
      },
    };
    const rendered = mount(Text, { context: { props } }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value.toString());
  });

  it('should render embedded html as-is when encoding is disabled', () => {
    const props = {
      field: {
        value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
      },
      encode: false,
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render ee HTML', () => {
    const props = {
      field: {
        editable: eeTextData,
      },
    };
    const rendered = mount(Text, { props }).find('span');
    expect(rendered.exists()).toBe(true);
    expect(rendered.html().indexOf('<input')).toBeGreaterThan(-1);
    expect(rendered.html().indexOf('<span class="scChromeData">')).toBeGreaterThan(-1);
  });

  it('should render tag with a tag provided', () => {
    const props = {
      field: {
        value: 'value',
      },
      tag: 'h1',
    };
    const rendered = mount(Text, { props }).find('h1');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render other attributes with other props provided', () => {
    const props = {
      field: {
        value: 'value',
      },
      tag: 'h1',
    };
    const attrs = {
      class: 'cssClass',
      id: 'lorem',
    };
    const rendered = mount(Text, { props, attrs }).find('h1');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.tagName).toBe(props.tag.toUpperCase());
    expect(rendered.attributes()).toMatchObject(attrs);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });
});
