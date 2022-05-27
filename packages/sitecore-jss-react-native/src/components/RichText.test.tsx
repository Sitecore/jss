import React from 'react';
import renderer from 'react-test-renderer';
import { RichText } from './RichText';

describe.only('<RichText />', () => {
  test('should render nothing with missing field', () => {
    const field: unknown = null;
    const rendered = renderer.create(<RichText field={field} />);
    expect(rendered).toMatchSnapshot();
  });

  test('should render nothing with missing editable and value', () => {
    const props = {
      field: {},
    };
    const rendered = renderer.create(<RichText {...props} />);
    expect(rendered).toMatchSnapshot();
  });

  test('should render editable value if present', () => {
    const props = {
      field: {
        value: 'this value should not be rendered',
        editable: '<p>this value should be rendered &copy;</p>',
      },
    };
    const rendered = renderer.create(<RichText {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  test('should render value if editable is undefined', () => {
    const props = {
      field: {
        value: 'this value should be rendered',
        editable: '',
      },
    };
    const rendered = renderer.create(<RichText {...props} />);

    expect(rendered).toMatchSnapshot();
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      editable: 'value with <p>markup</p>',
    };

    // 'baseStyle' prop will be applied to the html View (outer container).
    // https://meliorence.github.io/react-native-render-html/api/renderhtmlprops
    const rendered = renderer.create(
      <RichText
        field={field}
        baseStyle={{ flex: 1 }}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
