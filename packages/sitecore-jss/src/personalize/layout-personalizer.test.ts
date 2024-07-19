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

const { personalizeLayout, personalizePlaceholder, personalizeComponent } = personalize;

describe('layout-personalizer', () => {
  describe('personalizeLayout', () => {
    it('should not return anything', () => {
      const variant = 'test';
      const personalizedLayoutResult = personalizeLayout(layoutData, variant);
      expect(personalizedLayoutResult).to.equal(undefined);
    });

    it('should return undefined if no placeholders', () => {
      const variant = 'test';
      const personalizedLayoutResult = personalizeLayout(layoutDataWithoutPlaceholder, variant);
      expect(personalizedLayoutResult).to.equal(undefined);
    });

    it('should set variantId on Sitecore context', () => {
      const variant = 'test';
      personalizeLayout(layoutData, variant);
      expect(layoutData.sitecore.context.variantId).to.equal(variant);
    });

    describe('with component variant ids', () => {
      it('should not return anything', () => {
        const variant = 'test';
        const componentVariantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedLayoutResult = personalizeLayout(
          layoutData,
          variant,
          componentVariantIds
        );
        expect(personalizedLayoutResult).to.equal(undefined);
      });

      it('should return undefined if no placeholders', () => {
        const variant = 'test';
        const componentVariantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedLayoutResult = personalizeLayout(
          layoutDataWithoutPlaceholder,
          variant,
          componentVariantIds
        );
        expect(personalizedLayoutResult).to.equal(undefined);
      });

      it('should set variantId on Sitecore context', () => {
        const variant = 'test';
        const componentVariantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        personalizeLayout(layoutData, variant, componentVariantIds);
        expect(layoutData.sitecore.context.variantId).to.equal(variant);
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
        const variantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], variantIds);
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

        const variantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], variantIds);
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

      it('should return null when variantVariant is hidden', () => {
        const variant = 'mountain_bike_audience';
        const personalizedComponentResult = personalizeComponent(
          (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.equal(null);
      });

      it('should return null when variantVariant and componentName is undefined', () => {
        const variant = 'test';
        const personalizedComponentResult = personalizeComponent(
          (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
          [variant]
        );
        expect(personalizedComponentResult).to.equal(null);
      });
    });

    describe('with multiple variant Ids', () => {
      const testComponent = structuredClone(component);

      it('should return personalized component without experiences', () => {
        const variantIds = ['mountain_bike_audience', 'another_variant', 'third_variant'];
        const personalizedComponentResult = personalizeComponent(
          (testComponent as unknown) as ComponentRenderingWithExperiences,
          variantIds
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
