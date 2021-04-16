/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  ComponentRendering,
  HtmlElementRendering,
  PersonalizableComponentRendering,
  PlaceholdersData,
} from '../layout/models';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';

describe('LayoutPersonalizationUtils', () => {
  let layoutPersonalizationUtils: LayoutPersonalizationUtils;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let mockPlaceholdersData: PlaceholdersData;
  const personalizationComponentName = 'PersonalizationLoadingComponent';

  beforeEach(() => {
    layoutPersonalizationUtils = new LayoutPersonalizationUtils();
  });

  describe('replacePersonalizableComponentsWithLoaderComponents', () => {
    it('should set defaultComponent to each placeholder where hasPersonalization is true', () => {
      mockPlaceholdersData = {
        'jss-main': [
          <PersonalizableComponentRendering>{
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: false,
              defaultComponent: null, //
            },
          },
          {
            uid: '34a6553c-81de-5cd3-989e-853f6cb6df8c',
            componentName: 'Styleguide-Layout',
            placeholders: {
              'jss-styleguide-section': [
                <PersonalizableComponentRendering>{
                  uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
                  componentName: 'Styleguide-Layout-Tabs',
                  personalization: {
                    hiddenByDefault: false,
                    defaultComponent: null, //
                  },
                },
              ],
            },
          },
        ],
      };
      layoutPersonalizationUtils.replacePersonalizableComponentsWithLoaderComponents(
        mockPlaceholdersData,
        personalizationComponentName
      );

      const resultJssMain: PersonalizableComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as PersonalizableComponentRendering;
      expect(resultJssMain.componentName).to.equal(personalizationComponentName);
      expect(resultJssMain.personalization?.defaultComponent?.componentName).to.equal(
        'ContentBlock'
      );
      expect(resultJssMain.personalization?.hiddenByDefault).to.be.false;

      const resultJssStyleguideSection: PersonalizableComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][1] as PersonalizableComponentRendering;
      expect(resultJssStyleguideSection.componentName).to.equal('Styleguide-Layout');
      expect(resultJssStyleguideSection.personalization?.defaultComponent).is.undefined;
      expect(resultJssStyleguideSection.personalization?.hiddenByDefault).is.undefined;

      const resultJssStyleguideLayoutTabsSection: PersonalizableComponentRendering = resultJssStyleguideSection
        .placeholders?.['jss-styleguide-section'][0] as PersonalizableComponentRendering;
      expect(resultJssStyleguideLayoutTabsSection.componentName).to.equal(
        personalizationComponentName
      );
      expect(
        resultJssStyleguideLayoutTabsSection.personalization?.defaultComponent?.componentName
      ).to.equal('Styleguide-Layout-Tabs');
      expect(resultJssStyleguideLayoutTabsSection.personalization?.hiddenByDefault).to.be.false;
    });

    it('should skip replacing to each placeholder where hasPersonalization is false', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            fields: {
              heading: {
                value: 'JSS Styleguide',
              },
              content: {
                value: '<p>This is a live set of examples of how to use JSS.</p>',
              },
            },
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizableComponentsWithLoaderComponents(
        mockPlaceholdersData,
        personalizationComponentName
      );

      const resultContentBlock: ComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as ComponentRendering;
      expect(resultContentBlock.componentName).to.equal('ContentBlock');
      expect('personalization' in resultContentBlock).is.false;
    });

    it('should set componentName as personalizationComponentName to each placeholder where isComponentRendering is true', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            componentName: 'Styleguide-Layout',
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            dataSource: '{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}',
            placeholders: {
              'jss-styleguide-section': [
                <PersonalizableComponentRendering>{
                  uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
                  componentName: 'Styleguide-Layout-Tabs',
                  personalization: {
                    hiddenByDefault: false,
                    defaultComponent: null,
                  },
                },
              ],
            },
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizableComponentsWithLoaderComponents(
        mockPlaceholdersData,
        personalizationComponentName
      );

      const resultJssMain: ComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as ComponentRendering;
      expect(resultJssMain.componentName).to.not.equal(personalizationComponentName);
      const nestedPlaceholderData = resultJssMain.placeholders as PlaceholdersData;
      expect(
        (nestedPlaceholderData?.['jss-styleguide-section'][0] as ComponentRendering).componentName
      ).to.equal(personalizationComponentName);
    });

    it('should skip replacing the componentName to each placeholder where isComponentRendering is false', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            name: 'HtmlElementRenderingName',
            contents: 'HtmlElementRenderingContents',
            attributes: {},
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizableComponentsWithLoaderComponents(
        mockPlaceholdersData,
        personalizationComponentName
      );

      const resultJssMain: ComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as ComponentRendering;
      expect(resultJssMain.componentName).is.undefined;
      const resultJssMainHtml: HtmlElementRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as HtmlElementRendering;
      expect(resultJssMainHtml.name).to.be.equal('HtmlElementRenderingName');
    });

    it('should return defaultComponent as null if <hiddenByDefault> is true', () => {
      mockPlaceholdersData = {
        'jss-main': [
          <PersonalizableComponentRendering>{
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: true,
              defaultComponent: null,
            },
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizableComponentsWithLoaderComponents(
        mockPlaceholdersData,
        personalizationComponentName
      );

      const result: PersonalizableComponentRendering = mockPlaceholdersData[
        'jss-main'
      ][0] as PersonalizableComponentRendering;
      expect(result.componentName).to.be.equal(personalizationComponentName);
      expect(result.personalization).not.to.be.undefined;
      expect(result.personalization.hiddenByDefault).to.be.true;
      expect(result.personalization.defaultComponent).to.be.null;
    });
  });

  describe('getPersonalizableComponents', () => {
    it('should return collection contains components only with section <personalization>', () => {
      mockPlaceholdersData = {
        'jss-main': [
          <PersonalizableComponentRendering>{
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'PersonalizationLoadingComponent',
            personalization: {
              hiddenByDefault: true,
              defaultComponent: null,
            },
          },
          {
            componentName: 'Styleguide-Layout',
            uid: '34a6553c-81de-5cd3-989e-853f6cb6df8c',
            placeholders: {
              'jss-styleguide-layout': [],
            },
          },
        ],
      };

      const personalizableComponents = layoutPersonalizationUtils.getPersonalizableComponents(
        mockPlaceholdersData
      );
      expect(personalizableComponents).to.have.lengthOf(1);
      expect(personalizableComponents[0].componentName).to.equal(personalizationComponentName);
    });

    it('should return collection contains nested components only with section <componentName> where isPersonalizableComponentRendering for root component is false', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            componentName: 'Styleguide-Layout',
            uid: '34a6553c-81de-5cd3-989e-853f6cb6df8c',
            placeholders: {
              'jss-styleguide-layout': [
                <PersonalizableComponentRendering>{
                  uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
                  componentName: 'PersonalizationLoadingComponent',
                  personalization: {
                    hiddenByDefault: true,
                    defaultComponent: null,
                  },
                },
                {
                  uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
                  componentName: 'PersonalizationLoadingComponent2',
                  personalization: {
                    hiddenByDefault: true,
                    defaultComponent: null,
                  },
                },
              ],
            },
          },
          {
            componentName: 'No-Placeholders',
            uid: '34a6553c-6666-5cd3-989e-853f6cb6df8c',
          },
        ],
      };

      const personalizableComponents = layoutPersonalizationUtils.getPersonalizableComponents(
        mockPlaceholdersData
      );
      expect(personalizableComponents).to.have.lengthOf(2);
      expect(personalizableComponents[0].componentName).to.equal(personalizationComponentName);
      expect(personalizableComponents[1].componentName).to.equal(
        personalizationComponentName.concat('2')
      );
    });

    it('should return empty collection if for each element isPersonalizableComponentRendering is false', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            name: 'HtmlElementRenderingName',
            contents: 'HtmlElementRenderingContents',
            attributes: {},
          },
        ],
      };

      const personalizedComponents = layoutPersonalizationUtils.getPersonalizableComponents(
        mockPlaceholdersData
      );

      expect(personalizedComponents).to.be.empty;
    });
  });

  describe('buildPersonalizedFragment', () => {
    let mockPersonalizedFragments: { [key: string]: ComponentRendering | null | undefined };
    let defaultComponent: ComponentRendering;

    it('should return null if nested ComponentRendering is null', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': null,
      };

      const builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        null
      );

      expect(builtPersonalizedFragment).to.be.null;
    });

    it('should return default component if nested ComponentRendering is undefined', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': undefined,
      };

      defaultComponent = {
        componentName: 'ComponentName',
        uid: 'uid',
      };

      const builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragment).to.deep.equal(defaultComponent);
    });

    it('should return personalizedFragment if collection contains 0 placeholders', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': {
          componentName: 'Styleguide-Layout',
          uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        },
        '34a6553c-6666-5cd3-989e-853f6cb6df8c': {
          componentName: 'Styleguide',
          uid: '34a6553c-6666-5cd3-989e-853f6cb6df8c',
          placeholders: {},
        },
      };

      defaultComponent = {
        componentName: 'ComponentName',
        uid: 'uid',
      };

      let personalizedFragment = mockPersonalizedFragments['e02ddb9b-a062-5e50-924a-1940d7e053ce'];
      let builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragment).to.deep.equal(personalizedFragment);

      personalizedFragment = mockPersonalizedFragments['34a6553c-6666-5cd3-989e-853f6cb6df8c'];
      builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        '34a6553c-6666-5cd3-989e-853f6cb6df8c',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragment).to.deep.equal(personalizedFragment);
    });

    it('should return personalizedFragment if placeholders ComponentRendering does not require personalization', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': {
          componentName: 'Styleguide-Layout',
          uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
          placeholders: {
            'jss-main': [
              {
                componentName: 'Styleguide',
                uid: '34a6553c-6666-5cd3-989e-853f6cb6df8c',
                placeholders: {},
              },
            ],
          },
        },
      };

      defaultComponent = {
        componentName: 'ComponentName',
        uid: 'uid',
      };

      const personalizedFragment =
        mockPersonalizedFragments['e02ddb9b-a062-5e50-924a-1940d7e053ce'];
      const builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragment).to.deep.equal(personalizedFragment);
    });

    it('should return defaultComponent if personalizedFragment searched by key in nested placeholder is null', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': {
          componentName: 'Styleguide-Layout',
          uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
          placeholders: {
            'jss-main': [
              {
                uid: 'uidNotExist',
                componentName: 'componentNameNotExists',
              },
            ],
          },
        },
      };

      defaultComponent = {
        componentName: 'ComponentName',
        uid: 'uid',
      };

      const personalizedFragment =
        mockPersonalizedFragments['e02ddb9b-a062-5e50-924a-1940d7e053ce'];
      const builtPersonalizedFragment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragment).to.deep.equal(personalizedFragment);
    });
  });
});
