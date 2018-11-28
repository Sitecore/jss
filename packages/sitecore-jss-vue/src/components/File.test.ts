/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';

import FileSlotSfc from '../test/components/sfc/SampleScopedSlotFileField.vue';
import { File } from './File';

describe('<File />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(File);
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    const rendered = mount(File, { context: { props: { field } } });
    expect(rendered.isEmpty()).toBe(true);
  });

  it('should render with src directly on provided field', () => {
    const field = {
      src: '/lorem',
      title: 'ipsum',
    };
    const rendered = mount(File, { context: { props: { field } } });
    expect(rendered.attributes().href).toBe(field.src);
    expect(rendered.text()).toBe(field.title);
  });

  it('should render with src in provided field.value', () => {
    const field = {
      value: {
        src: '/lorem',
        title: 'ipsum',
      },
    };
    const rendered = mount(File, { context: { props: { field } } });
    expect(rendered.attributes().href).toBe(field.value.src);
    expect(rendered.text()).toBe(field.value.title);
  });

  it('should render display name if no title', () => {
    const field = {
      value: {
        src: '/lorem',
        displayName: 'ipsum',
      },
    };
    const rendered = mount(File, { context: { props: { field } } });
    expect(rendered.text()).toBe(field.value.displayName);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        src: '/lorem',
        title: 'ipsum',
      },
    };
    const attrs = { id: 'my-file', class: 'my-css', arbitrary: 'somevalue' };

    const rendered = mount(File, {
      context: {
        props: { field },
        attrs,
      },
    });

    expect(rendered.attributes()).toMatchObject(attrs);
  });

  describe('when scoped slot is defined', () => {
    const propsData = {
      fields: {
        file: {
          value: {
            src: '/somefile.pdf',
            title: 'My File',
          },
        },
      },
    };

    it('should render scoped slot', () => {
      const rendered = mount(File, {
        context: {
          props: { field: propsData.fields.file },
        },
        scopedSlots: {
          default: '<span slot-scope="file">{{file.src}}</span>',
        },
      });

      expect(rendered.html()).toBe(`<span>${propsData.fields.file.value.src}</span>`);
    });

    // This test uses an imported SFC to essentially test what the previous unit tests.
    // Helping to ensure integration with SFC usage.
    it('should render SFC component as scoped slot', () => {
      const rendered = mount(FileSlotSfc, {
        propsData,
      });

      expect(rendered.element.innerHTML).toBe(
        `<button><span>${propsData.fields.file.value.title}</span></button>`
      );
    });

    // Technically, yeah, we're testing Vue behavior here.
    // But we also want to make sure our File component implementation isn't inadvertently breaking something.
    it('should bind slot data to slot component event handler', () => {
      const clickHandler = jest.fn();
      const rendered = mount(FileSlotSfc, {
        propsData: {
          ...propsData,
          onDoIt: clickHandler,
        },
      });

      rendered.find('button').trigger('click');
      expect(clickHandler.mock.calls[0][0]).toBe(propsData.fields.file.value.src);
    });
  });
});
