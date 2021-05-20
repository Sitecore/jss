/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { expect, use } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';
import { createStubInstance, stub, StubbableType, SinonStubbedInstance, SinonStubbedMember } from 'sinon';

import { usePersonalization } from '../enhancers/usePersonalization';
import { ComponentFactoryReactContext,  } from '../components/SitecoreContext';
import { LayoutPersonalizationService } from '@sitecore-jss/sitecore-jss';

export type StubbedClass<T> = SinonStubbedInstance<T> & T;

export function createSinonStubInstance<T>(
  constructor: StubbableType<T>,
  overrides?: { [K in keyof T]?: SinonStubbedMember<T[K]> },
): StubbedClass<T> {
  const stub = createStubInstance<T>(constructor, overrides);
  return stub as unknown as StubbedClass<T>;
}

use(spies);

describe('usePersonalization', () => {

  describe('usePersonalization()', () => {
    it('context access', () => {
      const layoutPersonalizationService  = createSinonStubInstance(LayoutPersonalizationService);
      layoutPersonalizationService.isLoading.returns(false);
      const componentFactory  = stub();

      var personalizationResult: any;
      const TestComponent: React.FC<any> = () => {
        personalizationResult = usePersonalization({ uid: "testuid", layoutPersonalizationService: layoutPersonalizationService });

        return (
          <div>
          </div>
        );
      };

      const wrapper = mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      expect(wrapper).to.have.length(1);

      expect(personalizationResult).is.not.null;
      expect(personalizationResult.isLoading).is.false;
      expect(personalizationResult.personalizedComponent).is.null;
    });
  });
});
