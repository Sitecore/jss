import { expect } from 'chai';
import * as personalize from './layout-personalizer';
import { ComponentRenderingWithExperiences } from './layout-personalizer';
import {
  layoutData,
  componentsArray,
  component,
  componentsWithExperiencesArray,
  componentWithExperiences,
  layoutDataWithoutPlaceholder,
  withoutComponentName,
  variantIsHidden,
  component2,
  component3,
  component4,
  mountain_bike_audience,
  city_bike_audience,
} from '../test-data/personalizeData';
import { HIDDEN_RENDERING_NAME } from '../constants';

const { personalizeLayout, personalizePlaceholder, personalizeComponent } = personalize;

describe('layout-personalizer', () => {
  const componentVariantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];

  describe('personalizeLayout', () => {
    it('should return unmodified placeholder data when no component variantIds passed', () => {
      const variant = 'test';
      // personalizeLayout modifies the incoming layoutData - we need to clone it to keep tests truthful
      const testLayoutData = structuredClone(layoutData);
      const personalizedLayoutResult = personalizeLayout(testLayoutData, variant);
      expect(personalizedLayoutResult).to.equal(testLayoutData.sitecore.route.placeholders);
    });

    it('should return undefined if no placeholders', () => {
      const variant = 'test';
      const testLayoutData = structuredClone(layoutDataWithoutPlaceholder);
      const personalizedLayoutResult = personalizeLayout(testLayoutData, variant);
      expect(personalizedLayoutResult).to.deep.equal(undefined);
    });

    it('should set variantId on Sitecore context', () => {
      const variant = 'test';
      const testLayoutData = structuredClone(layoutData);
      personalizeLayout(testLayoutData, variant);
      expect(testLayoutData.sitecore.context.variantId).to.equal(variant);
    });

    describe('with component variant ids', () => {
      it('should apply component variant Ids to placeholders', () => {
        const variant = 'test';
        const testLayoutData = structuredClone(layoutData);
        const result = personalizeLayout(testLayoutData, variant, componentVariantIds);
        console.log(JSON.stringify(result));
        expect(result).to.be.deep.equal({ 'jss-main': [...componentsWithExperiencesArray] });
      });
    });
  });

  describe('personalizePlaceholder', () => {
    describe('with single variant Id', () => {
      it('should return array of personalized components', () => {
        const variant = 'mountain_bike_audience';
        const personalizedPlaceholderResult = personalizePlaceholder(componentsArray, [variant]);
        expect(personalizedPlaceholderResult).to.deep.equal(componentsWithExperiencesArray);
      });

      it('should personalize component and nested components', () => {
        const rootComponent = {
          uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
          componentName: 'ContentBlock',
          dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
          fields: { content: { value: '' }, heading: { value: 'Default Content' } },
          experiences: {
            mountain_bike_audience: {
              ...mountain_bike_audience,
              placeholders: {
                main: [component, component2],
              },
            },
            city_bike_audience,
          },
        };
        const variant = 'mountain_bike_audience';
        const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], [variant]);
        expect(personalizedPlaceholderResult).to.deep.equal([
          {
            uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
            componentName: 'ContentBlock',
            dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
            fields: mountain_bike_audience.fields,
            placeholders: {
              main: [
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 2',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
              ],
            },
          },
        ]);
      });

      it('should personalize nested components', () => {
        const rootComponent = {
          uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
          componentName: 'ContentBlock',
          dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
          fields: { content: { value: '' }, heading: { value: 'Default Content' } },
          placeholders: {
            main: [component, component2],
          },
        };

        const variant = 'mountain_bike_audience';
        const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], [variant]);
        expect(personalizedPlaceholderResult).to.deep.equal([
          {
            uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
            componentName: 'ContentBlock',
            dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
            fields: { content: { value: '' }, heading: { value: 'Default Content' } },
            placeholders: {
              main: [
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 2',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
              ],
            },
          },
        ]);
      });
    });

    describe('with multiple variant Ids', () => {
      it('should return array of personalized components', () => {
        const variantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedPlaceholderResult = personalizePlaceholder(componentsArray, variantIds);
        expect(personalizedPlaceholderResult).to.deep.equal(componentsWithExperiencesArray);
      });

      it('should personalize component and nested components', () => {
        const rootComponent = {
          uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
          componentName: 'ContentBlock',
          dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
          fields: { content: { value: '' }, heading: { value: 'Default Content' } },
          experiences: {
            mountain_bike_audience: {
              ...mountain_bike_audience,
              placeholders: {
                main: [component, component2],
              },
            },
            city_bike_audience,
          },
        };
        const personalizedPlaceholderResult = personalizePlaceholder(
          [rootComponent],
          componentVariantIds
        );
        expect(personalizedPlaceholderResult).to.deep.equal([
          {
            uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
            componentName: 'ContentBlock',
            dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
            fields: mountain_bike_audience.fields,
            placeholders: {
              main: [
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 2',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
              ],
            },
          },
        ]);
      });

      it('should personalize nested components', () => {
        const rootComponent = {
          uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
          componentName: 'ContentBlock',
          dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
          fields: { content: { value: '' }, heading: { value: 'Default Content' } },
          placeholders: {
            main: [component, component2],
          },
        };
        const personalizedPlaceholderResult = personalizePlaceholder(
          [rootComponent],
          componentVariantIds
        );
        expect(personalizedPlaceholderResult).to.deep.equal([
          {
            uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
            componentName: 'ContentBlock',
            dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
            fields: { content: { value: '' }, heading: { value: 'Default Content' } },
            placeholders: {
              main: [
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 2',
                  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                  fields: mountain_bike_audience.fields,
                },
              ],
            },
          },
        ]);
      });

      it('should personalize multiple components', () => {
        const rootComponent = {
          uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
          componentName: 'ContentBlock',
          dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
          fields: { content: { value: '' }, heading: { value: 'Default Content' } },
          experiences: {
            mountain_bike_audience: {
              ...mountain_bike_audience,
              placeholders: {
                main: [component3, component4],
              },
            },
            city_bike_audience,
          },
        };
        const variantIds = ['mountain_bike_audience', 'sand_bike_audience', 'snow_bike_audience'];
        const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], variantIds);
        expect(personalizedPlaceholderResult).to.deep.equal([
          {
            uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
            componentName: 'ContentBlock',
            dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
            fields: {
              content: {
                value:
                  '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
              },
              heading: {
                value: 'Mountain Bike',
              },
            },
            placeholders: {
              main: [
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 3',
                  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
                  fields: {
                    content: {
                      value:
                        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Snow-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
                    },
                    heading: {
                      value: 'Snow Bike',
                    },
                  },
                },
                {
                  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                  componentName: 'ContentBlock 4',
                  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
                  fields: {
                    content: {
                      value:
                        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Sand-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
                    },
                    heading: {
                      value: 'Sand Bike',
                    },
                  },
                },
              ],
            },
          },
        ]);
      });
    });
  });

  describe('personalizeComponent', () => {
    describe('with single variantId', () => {
      // clone the original component since it will be modified
      const testComponent = structuredClone(component);

      it('should return personalized component without experiences', () => {
        const variant = 'mountain_bike_audience';
        const personalizedComponentResult = personalizeComponent(
          (testComponent as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
        expect(
          (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
        ).to.deep.equal(undefined);
      });

      it('should return default component without experiences when variant is undefined', () => {
        const variant = '_default';
        const personalizedComponentResult = personalizeComponent(
          (testComponent as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.deep.equal(testComponent);
        expect(
          (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
        ).to.deep.equal({});
      });

      it('should return null when variant is hidden', () => {
        const variant = 'mountain_bike_audience';
        const personalizedComponentResult = personalizeComponent(
          (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.equal(null);
      });

      it('should return null when variant and componentName is undefined', () => {
        const variant = 'test';
        const personalizedComponentResult = personalizeComponent(
          (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.equal(null);
      });
    });

    it('should return HIDDEN_RENDERING variant in metadata mode with uid preserved', () => {
      const variant = 'mountain_bike_audience';
      const personalizedComponentResult = personalizeComponent(
        (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
        [variant],
        true
      );
      expect(personalizedComponentResult?.uid).to.equal(variantIsHidden.uid);
    });

    it('should return HIDDEN_RENDERING variant in metadata edit mode when non-default variant is hidden', () => {
      const variant = 'mountain_bike_audience';
      const personalizedComponentResult = personalizeComponent(
        (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
        [variant],
        true
      );
      expect(personalizedComponentResult?.componentName).to.equal(HIDDEN_RENDERING_NAME);
    });

    it('should return HIDDEN_RENDERING variant in metadata edit mode when default variant is hidden', () => {
      const variant = 'will-not-match';
      const personalizedComponentResult = personalizeComponent(
        (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
        [variant],
        true
      );
      expect(personalizedComponentResult?.componentName).to.equal(HIDDEN_RENDERING_NAME);
    });

    describe('with multiple variant Ids', () => {
      const testComponent = structuredClone(component);

      it('should return personalized component without experiences', () => {
        const personalizedComponentResult = personalizeComponent(
          (testComponent as unknown) as ComponentRenderingWithExperiences,
          componentVariantIds
        );
        expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
        expect(
          (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
        ).to.deep.equal(undefined);
      });

      it('should return default component without experiences when variant is undefined', () => {
        const variantIds = ['_default', 'another_variant', 'third_variant'];
        const personalizedComponentResult = personalizeComponent(
          (testComponent as unknown) as ComponentRenderingWithExperiences,
          variantIds
        );
        expect(personalizedComponentResult).to.deep.equal(testComponent);
        expect(
          (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
        ).to.deep.equal({});
      });

      it('should return null when variantVariant is hidden', () => {
        const variantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedComponentResult = personalizeComponent(
          (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
          variantIds
        );
        expect(personalizedComponentResult).to.equal(null);
      });

      it('should return null when variantVariant and componentName is undefined', () => {
        const variantIds = ['test', 'another_variant', 'third_variant'];
        const personalizedComponentResult = personalizeComponent(
          (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
          variantIds
        );
        expect(personalizedComponentResult).to.equal(null);
      });
    });
  });
});
