import { expect } from 'chai';
import { ComponentRendering } from '../layout/models';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';

describe('LayoutPersonalizationUtils', () => {
  let layoutPersonalizationUtils: LayoutPersonalizationUtils;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let mockPlaceholdersJson: any;
  const personalizationComponentName = 'PersonalizationLoadingComponent';

  beforeEach(() => {
    layoutPersonalizationUtils = new LayoutPersonalizationUtils();
  });

  describe('replacePersonalizedComponentsWithLoaderComponents', () => {
    it('should skip if no key in placeholder', () => {
      mockPlaceholdersJson = {
        uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
        componentName: 'Styleguide-Layout-Tabs',
        personalization: {
          hiddenByDefault: false
        }
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering = mockPlaceholdersJson;
      expect(result.componentName).not.to.equal(personalizationComponentName);
      expect(result.componentName).to.equal("Styleguide-Layout-Tabs");
    });

    it('should skip if component is not componentRendering', () => {
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
                    hiddenByDefault: false
                  }
                }
              ]
            }
          }
        ]
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson["jss-main"];
      expect(result[0].componentName).to.be.undefined;
      const resultJssStyleguideSection: ComponentRendering[] = result[0].placeholders?.["jss-styleguide-section"] as ComponentRendering[];
      expect(resultJssStyleguideSection[0].componentName).not.to.equal(personalizationComponentName);
      expect(resultJssStyleguideSection[0].componentName).to.equal("Styleguide-Layout-Tabs");
    });

    it('should change JSON structure and component name if personalization section exists', () => {
      mockPlaceholdersJson = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: false
            }
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
                    hiddenByDefault: false
                  }
                }
              ]
            }
          }
        ]
      };
      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const resultJssMain: ComponentRendering[] = mockPlaceholdersJson["jss-main"];
      expect(resultJssMain[0].componentName).to.equal(personalizationComponentName);
      expect(resultJssMain[0].personalization?.defaultComponent?.componentName).to.equal("ContentBlock");
      expect(resultJssMain[0].personalization?.hiddenByDefault).to.be.false;
      const resultJssStyleguideSection: ComponentRendering[] = resultJssMain[1].placeholders?.["jss-styleguide-section"] as ComponentRendering[];
      expect(resultJssStyleguideSection[0].componentName).to.equal(personalizationComponentName);
      expect(resultJssStyleguideSection[0].personalization?.defaultComponent?.componentName).to.equal("Styleguide-Layout-Tabs");
      expect(resultJssStyleguideSection[0].personalization?.hiddenByDefault).to.be.false;
    });

    it('should be the same componentName if personalization section does not exist', () => {
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
                value:
                  '<p>This is a live set of examples of how to use JSS.</p>',
              }
            }
          }
        ]
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson["jss-main"];
      expect(result[0].componentName).not.to.be.equal(personalizationComponentName);
      expect(result[0].componentName).to.be.equal("ContentBlock");
      expect(result[0].personalization).to.be.undefined;
    });

    it('should defaultComponent be null if hiddenByDefault is true', () => {
      mockPlaceholdersJson = {
        'jss-main': [
          {
            uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
            componentName: 'ContentBlock',
            personalization: {
              hiddenByDefault: true
            }
          }
        ]
      };

      layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(
        mockPlaceholdersJson,
        personalizationComponentName
      );
      const result: ComponentRendering[] = mockPlaceholdersJson["jss-main"];
      expect(result[0].componentName).to.be.equal(personalizationComponentName);
      expect(result[0].personalization?.hiddenByDefault).to.be.true;
      expect(result[0].personalization?.defaultComponent).to.be.null;
    })
  });

  describe('getPersonalizedComponents', () => {
    it('should skip if no key placeholder', () => {
      mockPlaceholdersJson = {
        uid: '538e4831-f157-50bb-ac74-277fcac9fddb',
        componentName: 'PersonalizationLoadingComponent',
        personalization: {
          hiddenByDefault: true,
          defaultComponent: null
        }
      };

      let personalizedComponentRenderings = layoutPersonalizationUtils.getPersonalizedComponents(mockPlaceholdersJson);
      expect(personalizedComponentRenderings.length).to.equal(0);
    });
  })
});
