import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import { Image, isSvgImage } from './Image';

// In react-native, you need to "import" static assets via `require` statements.
// When the packager builds your app, it statically analyzes your code, extracts the assets that are `require`d into an array/map, then assigns them a numerical value.
// Presumably, it then uses that value as an index to retrieve/render the proper static asset.
// Hence, the `staticImages` defined below have numeric values for their `src` prop for mocking.
// Naturally, this doesn't actually test the `require` behavior of the packager, but that should be reserved for integration tests.

const staticImages = {
  'test-image-1': {
    src: 1,
  },
};

const networkImages = {
  'test-image-1': {
    src: 'https://jssapp/-/media/myfile.ashx&w=180&h=360',
    width: 180,
    height: 360,
    alt: 'Logo',
  },
};

const testData = [
  { label: 'static images', data: staticImages },
  { label: 'network images', data: networkImages },
];

describe('<Image />', () => {
  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      describe('with direct image object, no value/editable', () => {
        test('should render properly', () => {
          const props = {
            media: dataSet.data['test-image-1'],
            resizeMode: 'cover',
          };
          const rendered = renderer.create(<Image {...props} />);

          expect(rendered).toMatchSnapshot();
        });
      });

      describe('with value/editable image object', () => {
        test('should render properly', () => {
          const props = {
            media: {
              value: dataSet.data['test-image-1'],
              editable: 'bob loblaw',
            },
            resizeMode: 'cover',
          };
          const rendered = renderer.create(<Image {...props} />);

          expect(rendered).toMatchSnapshot();
        });
      });

      describe('with style prop', () => {
        describe('with width or height specified in field data', () => {
          test('should render merged styles', () => {
            const styles = StyleSheet.create({
              logoImage: {
                margin: 20,
              },
            });
            const props = {
              media: {
                value: {
                  ...dataSet.data['test-image-1'],
                  width: '180',
                  height: '360',
                },
                editable: 'bob loblaw',
              },
              style: styles.logoImage,
              resizeMode: 'cover',
            };
            const rendered = renderer.create(<Image {...props} />);

            expect(rendered).toMatchSnapshot();
          });
        });
      });
    });
  });

  test('isSvgImage', () => {
    const ut = (source: ImageSourcePropType, expected: boolean) =>
      expect(isSvgImage(source)).toEqual(expected);

    ut({ uri: './x.svg' }, true);
    ut({ uri: './x.png' }, false);
    ut({ uri: 'https://jssapp/-/media/myfile.svg&w=180' }, true);
    ut({ uri: 'https://jssapp/-/media/myfile.svg?w=180' }, true);
    ut({ uri: 'https://jssapp/-/media/myfile.png?w=180' }, false);
  });
});
