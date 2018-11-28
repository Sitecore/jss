/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';
import { richTextField as eeRichTextData } from '../test/data/field-data-EE-on';
import { RichText } from './RichText';

describe('<RichText />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(RichText);
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
    const rendered = mount(RichText, { context: { props } });
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
    const rendered = mount(RichText, { context: { props } }).find('div');
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
    const rendered = mount(RichText, { context: { props } }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render value with with just a value', () => {
    const props = {
      field: {
        value: 'value',
      },
    };
    const rendered = mount(RichText, { context: { props } }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render embedded html as-is', () => {
    const props = {
      field: {
        value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
      },
    };
    const rendered = mount(RichText, { context: { props } }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render ee HTML', () => {
    const props = {
      field: {
        editable: eeRichTextData,
      },
    };
    const rendered = mount(RichText, { context: { props } }).find('div');
    expect(rendered.html().indexOf('<input')).toBeGreaterThan(-1);
    expect(rendered.html().indexOf('<span class="scChromeData">')).toBeGreaterThan(-1);
  });

  it('should render tag with a tag provided', () => {
    const props = {
      field: {
        value: 'value',
      },
      tag: 'p',
    };
    const rendered = mount(RichText, { context: { props } }).find('p');
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
    const rendered = mount(RichText, { context: { props, attrs } }).find('h1');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.tagName).toBe(props.tag.toUpperCase());
    expect(rendered.attributes()).toMatchObject(attrs);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });
});
