import { expect } from 'chai';
import * as personalize from './layout-personalizer';
import { ComponentRenderingWithExpiriences } from './layout-personalizer';
import {
  layout,
  componentArr,
  component,
  componentArrWithExperiences,
  componentWithExperiences,
} from '../test-data/personalizeData';

const { personalizeLayout, personalizePlaceholder, personalizeComponent } = personalize;

describe('layout-personalizer', () => {
  describe('personalizeLayout', () => {
    it('should not return anything', () => {
      const segment = 'default';
      const personalizedLayoutResult = personalizeLayout(layout, segment);
      expect(personalizedLayoutResult).to.equal(undefined);
    });
  });

  describe('When segment is default', () => {
    describe('personalizePlaceholder', () => {
      const segment = 'default';
      const personalizedPlaceholderResult = personalizePlaceholder(componentArr, segment);
      it('should return array of personalized components when segment is default', () => {
        expect(personalizedPlaceholderResult).to.deep.equal(componentArr);
      });
    });

    describe('personalizeComponent', () => {
      const segment = 'default';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExpiriences,
        segment
      );
      it('should return personalized component', () => {
        expect(personalizedComponentResult).to.deep.equal(component);
      });
    });
  });

  describe('When segment is not default', () => {
    describe('personalizePlaceholder', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedPlaceholderResult = personalizePlaceholder(componentArr, segment);
      it('should return array of personalized components when segment is not default', () => {
        expect(personalizedPlaceholderResult).to.deep.equal(componentArrWithExperiences);
      });
    });

    describe('personalizeComponent', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedComponentResult = personalizeComponent(
        (component as unknown) as ComponentRenderingWithExpiriences,
        segment
      );
      it('should return personalized component when segment is not default', () => {
        expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
      });
    });
  });
});
