/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';
import { richTextField as eeRichTextData } from '../test/data/field-data-EE-on';
import { RichText } from './RichText';
import { describe, it, expect } from '@jest/globals';

describe('<RichText />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(RichText);
    expect(rendered.element.innerHTML).toBe(undefined);
    errorSpy.mockRestore();
  });

  it('should render nothing with missing editable and value', () => {
    const props: { field: null } = {
      field: null,
    };
    // Need to mock console.error as Vue will log an error for the null "field" prop
    // that is marked as an Object.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(RichText, { props });
    expect(rendered.element.innerHTML).toBe(undefined);
    errorSpy.mockRestore();
  });

  it('should render editable with editable value', () => {
    const props = {
      field: {
        value: 'value',
        editable: 'editable',
      },
    };
    const rendered = mount(RichText, { props }).find('div');
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
    const rendered = mount(RichText, { props }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render value with with just a value', () => {
    const props = {
      field: {
        value: 'value',
      },
    };
    const rendered = mount(RichText, { props }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render embedded html as-is', () => {
    const props = {
      field: {
        value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
      },
    };
    const rendered = mount(RichText, { props }).find('div');
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render ee HTML', () => {
    const props = {
      field: {
        editable: eeRichTextData,
      },
    };
    const rendered = mount(RichText, { props }).find('div');
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
    const rendered = mount(RichText, { props }).find('p');
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
    const rendered = mount(RichText, { props, attrs }).find('h1');
    expect(rendered.exists()).toBe(true);
    expect(rendered.element.tagName).toBe(props.tag.toUpperCase());
    expect(rendered.attributes()).toMatchObject(attrs);
    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should initialize links', () => {
    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1><a href="/t10">1</a><a href="/t10">2</a></div>',
      },
    };
    const rendered = mount(RichText, { props });
    expect(rendered.element.innerHTML).toContain('<div id="test">');
    expect(rendered.element.innerHTML).toContain('<h1>Hello!</h1>');
    expect(rendered.element.innerHTML).toContain('<a href="/t10">1</a>');
    expect(rendered.element.innerHTML).toContain('<a href="/t10">2</a>');
  });

  it('should not initialize links when does not have value', () => {
    const props = {
      field: {
        value: '',
      },
    };
    const rendered = mount(RichText, { props });
    const hasChildNodes = rendered.element.hasChildNodes();
    expect(hasChildNodes).toBe(false);
  });
  it('should not initialize links if no links in markup', () => {
    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1></div>',
      },
    };
    const rendered = mount(RichText, { props });
    expect(rendered.element.innerHTML).toContain('<div id="test">');
    expect(rendered.element.innerHTML).toContain('<h1>Hello!</h1>');
    expect(rendered.element.innerHTML).not.toContain('<a href=');
  });
  it('should navigate if anchor element clicked', async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const props = {
      field: {
        value: '<div id="test"><a href="/styleguide">1</a><h1>Hello!</h1></div>',
      },
    };
    const rendered = mount(RichText, {
      props,
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    await rendered.find('a').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/styleguide');
  });
  it('should navigate if nested element clicked', async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const props = {
      field: {
        value: '<div id="test"><a href="/styleguide"><span>nested</span></a><h1>Hello!</h1></div>',
      },
    };
    const rendered = mount(RichText, {
      props,
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    await rendered.find('span').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/styleguide');
  });
});
