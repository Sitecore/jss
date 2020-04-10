/* eslint-disable no-unused-expressions */
import { mount } from '@vue/test-utils';

import DateSlotSfc from '../test/components/sfc/SampleScopedSlotDateField.vue';
import { DateField, FormatterFunction } from './Date';

describe('<Date />', () => {
  it('should render nothing with missing field', () => {
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(DateField);
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });

  it('should render nothing with missing editable and value', () => {
    const field = { editable: '', value: '' };
    const rendered = mount(DateField, {
      context: { props: { field } },
    });
    expect(rendered.isEmpty()).toBe(true);
  });

  it('should render editable with editable value', () => {
    const props = { field: { value: 'value', editable: 'editable' } };
    const rendered = mount(DateField, {
      context: { props },
    }).find('span');
    expect(rendered.element.innerHTML).toBe(props.field.editable);
  });

  it('should render value with editing explicitly disabled', () => {
    const props = { field: { value: 'value', editable: 'editable' }, editable: false };
    const rendered = mount(DateField, {
      context: { props },
    }).find('span');

    expect(rendered.element.innerHTML).toBe(props.field.value);
  });

  it('should render formatted value with formatter', () => {
    const formatter: FormatterFunction = () => 'rendered val'
    const props = { 
      field: { value: 'value' },
      formatter
    };

    const rendered = mount(DateField, {
      context: { props },
    }).find('span');
    expect(rendered.element.innerHTML).toBe('rendered val');
  });

  it('should render null value with formatter', () => {
    const formatter: FormatterFunction = (value) => 'rendered val ' + value;
    const props = {
      field: { value: undefined, editable: 'xxx' },
      formatter,
      editable: false,
    };

    const rendered = mount(DateField, {
      context: { props },
    }).find('span');
    expect(rendered.element.innerHTML).toBe('rendered val null');
  })

  it('should render other attributes with other props provided', () => {
    const field = { value: 'value' };
    const attrs = { id: 'my-date', class: 'my-css', arbitrary: 'somevalue' };

    const rendered = mount(DateField, {
      context: {
        props: { field },
        attrs,
      },
    });

    expect(rendered.attributes()).toMatchObject(attrs);
  });

  it('should render scoped slot if defined', () => {
    const props = { field: { value: '1970-01-01' } };

    const rendered = mount(DateField, {
      context: {
        props,
      },
      scopedSlots: {
        default: '<em slot-scope="date">{{date.toISOString()}}</em>',
      },
    });

    expect(rendered.html()).toBe(`<em>${new Date(props.field.value).toISOString()}</em>`);
  });

  // This test uses an imported SFC to essentially test what the previous unit tests.
  // Helping to ensure integration with SFC usage.
  it('SFC should render scoped slot if defined', () => {
    const props = {
      fields: {
        date: {
          value: '1970-01-01',
        },
      },
    };
    const rendered = mount(DateSlotSfc, {
      propsData: props,
    });
    expect(rendered.element.innerHTML).toBe(
      `<em>${new Date(props.fields.date.value).toISOString()}</em>`
    );
  });
});
