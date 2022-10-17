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

  it('should render nothing if empty value', () => {
    const props = {
      field: {
        value: '',
      },
    };
    const rendered = mount(RichText, { props });
    const hasChildNodes = rendered.element.hasChildNodes();
    expect(hasChildNodes).toBe(false);
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

  it('should render embedded html as-is and use default tag', () => {
    const props = {
      field: {
        value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
      },
    };
    const rendered = mount(RichText, { props });
    expect(rendered.element.innerHTML).toBe(props.field.value);

    const input = rendered.find('input');
    expect(input.element.parentElement.tagName).toBe('DIV');
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

  it('Should render and initialize links', async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const props = {
      field: {
        value:
          '<div id="test"><h1>Hello!</h1><a href="/styleguide">1<span>nested</span></a><a href="/graphql#hash">2</a></div>',
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

    expect(rendered.element.innerHTML).toContain('<a href="/styleguide">1<span>nested</span></a>');
    expect(rendered.element.innerHTML).toContain('<a href="/graphql#hash">2</a>');

    // Make sure eventListener in not passed to wrong element
    await rendered.find('#test').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(0);

    await rendered.find('span').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/styleguide');

    const [link1, link2] = rendered.findAll('a');
    link1 && (await link1.trigger('click'));
    expect(mockRouter.push).toHaveBeenCalledTimes(2);
    expect(mockRouter.push).toHaveBeenCalledWith('/styleguide');
    link2 && (await link2.trigger('click'));
    expect(mockRouter.push).toHaveBeenCalledTimes(3);
    expect(mockRouter.push).toHaveBeenCalledWith('/graphql#hash');
  });

  it('should not initialize links when editable', async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const props = {
      field: {
        value: '<div>old value</div>',
        editable:
          '<div id="test"><a href="/styleguide">1<span>nested</span></a><a href="/graphql#hash">2</a></div>',
      },
      editable: true,
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
    expect(mockRouter.push).toHaveBeenCalledTimes(0);

    const [link1, link2] = rendered.findAll('a');
    link1 && (await link1.trigger('click'));
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    link2 && (await link2.trigger('click'));
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });
});
