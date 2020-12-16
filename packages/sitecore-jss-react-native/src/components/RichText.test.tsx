import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet } from 'react-native';
import { RichText } from './RichText';

describe('<RichText />', () => {
  test('should render nothing with missing field', () => {
    const field = null;
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
    const rawTextStyles = StyleSheet.create({
      style: {
        fontSize: 22,
      }
    });
    const markupStyles = StyleSheet.create({
      p: {
        fontSize: 16,
        marginBottom: 10,
      },
    });

    // 'style' prop will be applied to the html View (outer container).
    // 'stylesheet' is used by any html components created/parsed within the htmlview.
    // 'textComponentProps' is applied to any text strings created/parsed within the htmlview.
    // https://github.com/jsdf/react-native-htmlview#customizing-things-even-further
    const rendered = renderer.create(
      <RichText
        field={field}
        style={{ flex: 1 }}
        stylesheet={markupStyles}
        textComponentProps={rawTextStyles}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
