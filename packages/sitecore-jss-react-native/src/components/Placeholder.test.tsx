import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss';
import { Placeholder } from './Placeholder';
import { SitecoreContext } from './SitecoreContext';
import { devData } from '../../testData/dev-data';
import { lsDataEeOff } from '../../testData/LS-data-EE-off';

const componentFactory = (componentName: string) => {
  const components = new Map();

  // pass otherProps to page-content to test property cascading through the Placeholder
  const Home: React.SFC<any> = ({ rendering, ...otherProps }) => (
    <View testID="home-mock">
      <Placeholder name="page-header" rendering={rendering} />
      <Placeholder name="page-content" rendering={rendering} {...otherProps} />
    </View>
  );
  Home.propTypes = {
    placeholders: PropTypes.object,
    rendering: PropTypes.object,
  };

  components.set('Home', Home);

  const DownloadCallout: React.SFC<any> = (props) => (
    <View testID="download-callout-mock">
      {props.fields.message ? props.fields.message.value : null}
    </View>
  );
  DownloadCallout.propTypes = {
    fields: PropTypes.shape({
      message: PropTypes.object,
    }),
  };

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <View testID="jumbotron-mock" />);

  return components.get(componentName);
};

describe('<Placeholder />', () => {
  const testData = [
    { label: 'Dev data', data: devData },
    { label: 'LayoutService data - EE off', data: lsDataEeOff },
  ];

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      test('should render a placeholder with given key', () => {
        const phData: any = dataSet.data.sitecore.route.placeholders.main;
        const component = phData.find((c: ComponentRendering) => c.componentName);
        const phKey = 'page-content';

        // this will create a snapshot of the rendered component.
        // you'll need to visually inspect the snapshot to ensure expected rendering.
        const renderedComponent = renderer
          .create(
            <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
          )
          .toJSON();

        // subsequent test runs will then compare the rendered output to the snapshot.
        expect(renderedComponent).toMatchSnapshot();
      });

      test('should render nested placeholders and props correctly', () => {
        const component: any = dataSet.data.sitecore.route;
        const phKey = 'main';

        const renderedComponent = renderer
          .create(
            <SitecoreContext componentFactory={componentFactory}>
              <Placeholder name={phKey} rendering={component} />
            </SitecoreContext>
          )
          .toJSON();

        expect(renderedComponent).toMatchSnapshot();
      });
    });
  });

  it('should render missing component for unresolved/unknown components', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    // use local mocks to avoid console warnings from Placeholder about unknown nested placeholders
    const Home = () => <View testID="home-mock" />;
    const factory: any = (componentName: string) => (componentName === 'Home' ? Home : null);

    const route: any = {
      placeholders: {
        main: [
          {
            componentName: 'Home',
          },
          {
            componentName: 'whatisthis',
          },
        ],
      },
    };
    const phKey = 'main';

    const renderedComponent = renderer
      .create(<Placeholder name={phKey} rendering={route} componentFactory={factory} />)
      .toJSON();

    // placeholder should only render "Home" component
    expect(renderedComponent).toMatchSnapshot();

    errorSpy.mockRestore();
  });

  it('should render null for unknown placeholder', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    warnSpy.mockImplementation(() => {});
    const route: any = {
      placeholders: {
        main: [
          {
            componentName: 'Home',
          },
        ],
      },
    };
    const phKey = 'unknown';

    const renderedComponent = renderer
      .create(<Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });
});
