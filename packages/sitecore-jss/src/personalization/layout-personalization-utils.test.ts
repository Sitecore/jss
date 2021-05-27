/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { ComponentRendering, PlaceholdersData } from '../layout/models';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';

describe('LayoutPersonalizationUtils', () => {
  let layoutPersonalizationUtils: LayoutPersonalizationUtils;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let mockPlaceholdersJson: any;
  let mockPlaceholdersData: PlaceholdersData;
  const personalizationComponentName = 'PersonalizationLoadingComponent';

  beforeEach(() => {
    layoutPersonalizationUtils = new LayoutPersonalizationUtils();
  });

  describe('replacePersonalizedComponentsWithLoaderComponents', () => {
    it('should skip replacing if placeholder <key> does not exist', () => {
      mockPlaceholdersJson = {
        uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
        componentName: 'Styleguide-Layout-Tabs',
        personalization: {
          hiddenByDefault: false,
        },
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering = mockPlaceholdersJson;
      expect(result.componentName).not.to.equal(personalizationComponentName);
      expect(result.componentName).to.equal('Styleguide-Layout-Tabs');
    });

    it('should skip replacing if component is not ComponentRendering', () => {
      mockPlaceholdersJson = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            dataSource: '{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}',
            placeholders: {
              'jss-styleguide-section': [
                {
                  uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
                  componentName: 'Styleguide-Layout-Tabs',
                  personalization: {
                    hiddenByDefault: false,
                  },
                },
              ],
            },
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson['jss-main'];
      expect(result[0].componentName).to.be.undefined;
      const resultJssStyleguideSection: ComponentRendering[] = result[0].placeholders?.[
        'jss-styleguide-section'
      ] as ComponentRendering[];
      expect(resultJssStyleguideSection[0].componentName).not.to.equal(
        personalizationComponentName
      );
      expect(resultJssStyleguideSection[0].componentName).to.equal('Styleguide-Layout-Tabs');
    });

    it('should change JSON structure and componentName if <personalization> section exists', () => {
      mockPlaceholdersJson = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: false,
            },
          },
          {
            uid: '34a6553c-81de-5cd3-989e-853f6cb6df8c',
            componentName: 'Styleguide-Layout',
            placeholders: {
              'jss-styleguide-section': [
                {
                  uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
                  componentName: 'Styleguide-Layout-Tabs',
                  personalization: {
                    hiddenByDefault: false,
                  },
                },
              ],
            },
          },
        ],
      };
      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const resultJssMain: ComponentRendering[] = mockPlaceholdersJson['jss-main'];
      expect(resultJssMain[0].componentName).to.equal(personalizationComponentName);
      expect(resultJssMain[0].personalization?.defaultComponent?.componentName).to.equal(
        'ContentBlock'
      );
      expect(resultJssMain[0].personalization?.hiddenByDefault).to.be.false;
      const resultJssStyleguideSection: ComponentRendering[] = resultJssMain[1].placeholders?.[
        'jss-styleguide-section'
      ] as ComponentRendering[];
      expect(resultJssStyleguideSection[0].componentName).to.equal(personalizationComponentName);
      expect(
        resultJssStyleguideSection[0].personalization?.defaultComponent?.componentName
      ).to.equal('Styleguide-Layout-Tabs');
      expect(resultJssStyleguideSection[0].personalization?.hiddenByDefault).to.be.false;
    });

    it('should skip replacing if <personalization> section does not exist', () => {
      mockPlaceholdersJson = {
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

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson['jss-main'];
      expect(result[0].componentName).not.to.be.equal(personalizationComponentName);
      expect(result[0].componentName).to.be.equal('ContentBlock');
      expect(result[0].personalization).to.be.undefined;
    });

    it('should return defaultComponent as null if <hiddenByDefault> is true', () => {
      mockPlaceholdersJson = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: true,
            },
          },
        ],
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson['jss-main'];
      expect(result[0].componentName).to.be.equal(personalizationComponentName);
      expect(result[0].personalization?.hiddenByDefault).to.be.true;
      expect(result[0].personalization?.defaultComponent).to.be.null;
    });
  });

  describe('getPersonalizedComponents', () => {
    it('should return empty collection if placeholder <key> does not exist', () => {
      mockPlaceholdersJson = {
        uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
        componentName: 'PersonalizationLoadingComponent',
        personalization: {
          hiddenByDefault: true,
          defaultComponent: null,
        },
      };

      const personalizedComponents = layoutPersonalizationUtils.getPersonalizedComponents(
        mockPlaceholdersJson
      );
      expect(personalizedComponents.length).to.equal(0);
    });

    it('should return collection contains components only with section <personalization>', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
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

      const personalizedComponents = layoutPersonalizationUtils.getPersonalizedComponents(
        mockPlaceholdersData
      );
      expect(personalizedComponents.length).to.equal(1);
      expect(personalizedComponents[0].componentName).to.equal(personalizationComponentName);
    });

    it('should return collection contains nested components only with section <componentName> if section <personalization> does not exist in root component', () => {
      mockPlaceholdersData = {
        'jss-main': [
          {
            componentName: 'Styleguide-Layout',
            uid: '34a6553c-81de-5cd3-989e-853f6cb6df8c',
            placeholders: {
              'jss-styleguide-layout': [
                {
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

      const personalizedComponents = layoutPersonalizationUtils.getPersonalizedComponents(
        mockPlaceholdersData
      );
      expect(personalizedComponents.length).to.equal(2);
      expect(personalizedComponents[0].componentName).to.equal(personalizationComponentName);
      expect(personalizedComponents[1].componentName).to.equal(
        personalizationComponentName.concat('2')
      );
    });
  });

  describe('buildPersonalizedFragment', () => {
    let mockPersonalizedFragments: { [key: string]: ComponentRendering | null | undefined };
    let defaultComponent: ComponentRendering;

    it('should return null if personalizedFragment nested ComponentRendering is null', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': null,
      };

      const builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        null
      );

      expect(builtPersonalizedFragnment).to.be.null;
    });

    it('should return default component if personalizedFragment nested ComponentRendering is undefined', () => {
      mockPersonalizedFragments = {
        'e02ddb9b-a062-5e50-924a-1940d7e053ce': undefined,
      };

      defaultComponent = {
        componentName: 'ComponentName',
        uid: 'uid',
      };

      const builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragnment).to.deep.equal(defaultComponent);
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
      let builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragnment).to.deep.equal(personalizedFragment);

      personalizedFragment = mockPersonalizedFragments['34a6553c-6666-5cd3-989e-853f6cb6df8c'];
      builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        '34a6553c-6666-5cd3-989e-853f6cb6df8c',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragnment).to.deep.equal(personalizedFragment);
    });

    it('should return personalizedFragment if placeholders ComponentRendering doesnt require personalization', () => {
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
      const builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragnment).to.deep.equal(personalizedFragment);
    });

    it('should return defaultComponent if searched by key personalizedFragment in nested placeholder is null', () => {
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
      const builtPersonalizedFragnment = layoutPersonalizationUtils.buildPersonalizedFragment(
        'e02ddb9b-a062-5e50-924a-1940d7e053ce',
        mockPersonalizedFragments,
        defaultComponent
      );

      expect(builtPersonalizedFragnment).to.deep.equal(personalizedFragment);
    });
  });
});
