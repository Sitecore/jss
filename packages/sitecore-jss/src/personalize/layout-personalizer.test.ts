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
  });
});
