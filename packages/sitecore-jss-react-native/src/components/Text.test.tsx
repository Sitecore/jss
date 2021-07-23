import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from './Text';

describe('<Text />', () => {
  test('should render nothing with missing field', () => {
    const field: unknown = null;
    const rendered = renderer.create(<Text field={field} />);
    expect(rendered).toMatchSnapshot();
  });

  test('should render nothing with missing editable and value', () => {
    const props = {
      field: {},
    };
    const rendered = renderer.create(<Text {...props} />);
    expect(rendered).toMatchSnapshot();
  });

  it('should render nothing with empty value', () => {
    const props = {
      field: {
        value: '',
      },
    };
    const rendered = renderer.create(<Text {...props} />);
    expect(rendered).toMatchSnapshot();
  });

  test('should render editable value if present', () => {
    const props = {
      field: {
        value: 'this value should not be rendered',
        editable: 'this value should be rendered',
      },
    };
    const rendered = renderer.create(<Text {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  test('should render number value', () => {
    const props = {
      field: {
        value: 1.23,
      },
    };
    const rendered = renderer.create(<Text {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  test('should render zero number value', () => {
    const props = {
      field: {
        value: 0,
      },
    };
    const rendered = renderer.create(<Text {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  test('should render value if editable is undefined', () => {
    const props = {
      field: {
        value: 'this value should be rendered',
        editable: '',
      },
    };
    const rendered = renderer.create(<Text {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      editable: 'this value should be rendered',
    };

    const rendered = renderer.create(<Text field={field} style={{ flex: 1 }} selectable={true} />);
    expect(rendered).toMatchSnapshot();
  });
});
