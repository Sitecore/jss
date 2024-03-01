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
  });

  describe('personalizePlaceholder', () => {
    it('should return array of personalized components', () => {
      const variant = 'mountain_bike_audience';
      const personalizedPlaceholderResult = personalizePlaceholder(componentsArray, variant);
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
      const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], variant);
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
      const personalizedPlaceholderResult = personalizePlaceholder([rootComponent], variant);
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

  describe('personalizeComponent', () => {
    it('should return personalized component', () => {
      const variant = 'mountain_bike_audience';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExperiences,
        variant
      );
      expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
    });

    it('should return default component when variant is undefined', () => {
      const variant = '_default';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExperiences,
        variant
      );
      expect(personalizedComponentResult).to.deep.equal(component);
    });

    it('should return null when variantVariant is hidden', () => {
      const variant = 'mountain_bike_audience';
      const personalizedComponentResult = personalizeComponent(
        (variantIsHidden as unknown) as ComponentRenderingWithExperiences,
        variant
      );
      expect(personalizedComponentResult).to.equal(null);
    });

    it('should return null when variantVariant and componentName is undefined', () => {
      const variant = 'test';
      const personalizedComponentResult = personalizeComponent(
        (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
        variant
      );
      expect(personalizedComponentResult).to.equal(null);
    });

    it('should return personalized component without experiences', () => {
      const variant = 'mountain_bike_audience';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExperiences,
        variant
      );

      expect(
        (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
      ).to.deep.equal({});
    });

    it('should empty experiences for default variant', () => {
      const variant = '_default';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExperiences,
        variant
      );

      expect(
        (personalizedComponentResult as ComponentRenderingWithExperiences).experiences
      ).to.deep.equal({});
    });
  });
});
