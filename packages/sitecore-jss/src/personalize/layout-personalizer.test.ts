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
  segmentIsNull,
} from '../test-data/personalizeData';

const { personalizeLayout, personalizePlaceholder, personalizeComponent } = personalize;

describe('layout-personalizer', () => {
  describe('personalizeLayout', () => {
    it('should not return anything', () => {
      const segment = 'test';
      const personalizedLayoutResult = personalizeLayout(layoutData, segment);
      expect(personalizedLayoutResult).to.equal(undefined);
    });

    it('should return undefined if no placeholders', () => {
      const segment = 'test';
      const personalizedLayoutResult = personalizeLayout(layoutDataWithoutPlaceholder, segment);
      expect(personalizedLayoutResult).to.equal(undefined);
    });
  });

  describe('personalizePlaceholder', () => {
    it('should return array of personalized components', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedPlaceholderResult = personalizePlaceholder(componentsArray, segment);
      expect(personalizedPlaceholderResult).to.deep.equal(componentsWithExperiencesArray);
    });
  });

  describe('personalizeComponent', () => {
    it('should return personalized component', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExperiences,
        segment
      );
      expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
    });

    it('should return null when segmentVariant is null', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedComponentResult = personalizeComponent(
        (segmentIsNull as unknown) as ComponentRenderingWithExperiences,
        segment
      );
      expect(personalizedComponentResult).to.equal(null);
    });

    it('should return null when segmentVariant and componentName is undefined', () => {
      const segment = 'test';
      const personalizedComponentResult = personalizeComponent(
        (withoutComponentName as unknown) as ComponentRenderingWithExperiences,
        segment
      );
      expect(personalizedComponentResult).to.equal(null);
    });
  });
});
