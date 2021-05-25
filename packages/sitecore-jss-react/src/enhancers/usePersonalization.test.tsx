/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/check-param-names */

import React from 'react';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';
import {
  createStubInstance,
  stub,
  StubbableType,
  SinonStubbedInstance,
  SinonStubbedMember,
  SinonStub,
} from 'sinon';

import { usePersonalization, UsePersonalizationResult } from '../enhancers/usePersonalization';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';
import { LayoutPersonalizationService } from '@sitecore-jss/sitecore-jss';
import { MissingComponent } from '../components/MissingComponent';

use(spies);

describe('usePersonalization', () => {
  let layoutPersonalizationService: StubbedClass<LayoutPersonalizationService>;
  let componentFactory: SinonStub;

  beforeEach(() => {
    spy.on(console, 'error');
    layoutPersonalizationService = createSinonStubInstance(LayoutPersonalizationService);
    componentFactory = stub();
  });

  afterEach(() => {
    spy.restore(console);
  });

  describe('usePersonalization()', () => {
    it('should return personalizedComponent and isLoading from personalization service', () => {
      layoutPersonalizationService.isLoading.returns(false);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          layoutPersonalizationService: layoutPersonalizationService,
        });

        return <div></div>;
      };

      const wrapper = mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      expect(wrapper).to.have.length(1);

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.null;
    });

    it('should return loaded personalizedComponent', () => {
      const componentLayout = { componentName: 'test' };
      layoutPersonalizationService.isLoading.returns(true);

      layoutPersonalizationService.loadPersonalizedComponent.withArgs('testuid').callsFake(() => {
        layoutPersonalizationService.isLoading.returns(false);
        layoutPersonalizationService.getPersonalizedComponent
          .withArgs('testuid')
          .returns(componentLayout);
        return Promise.resolve(componentLayout);
      });
      componentFactory.withArgs(componentLayout.componentName).returns('div');

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          layoutPersonalizationService: layoutPersonalizationService,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      // within `setImmediate` all of the promises have been exhausted
      setImmediate(() => {
        expect(personalizationResult).is.not.null;
        expect(personalizationResult!.isLoading).is.false;
        expect(personalizationResult!.personalizedComponent).is.not.null;
        expect(personalizationResult!.personalizedComponent!.type).equal('div');
      });
    });

    it('should return missingComponentComponent when component not found', () => {
      const componentLayout = { componentName: 'test' };
      const missingComponentComponent = () => <div></div>;
      layoutPersonalizationService.isLoading.returns(false);
      layoutPersonalizationService.getPersonalizedComponent
        .withArgs('testuid')
        .returns(componentLayout);

      componentFactory.withArgs(componentLayout.componentName).returns(null);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          layoutPersonalizationService: layoutPersonalizationService,
          missingComponentComponent: missingComponentComponent,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.not.null;
      expect(personalizationResult!.personalizedComponent!.type).equal(missingComponentComponent);
      expect(console.error).to.have.been.called.with(
        'Unknown component test. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.'
      );
    });

    it('should return MissingComponent when component not found', () => {
      const componentLayout = { componentName: 'test' };
      layoutPersonalizationService.isLoading.returns(false);
      layoutPersonalizationService.getPersonalizedComponent
        .withArgs('testuid')
        .returns(componentLayout);

      componentFactory.withArgs(componentLayout.componentName).returns(null);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          layoutPersonalizationService: layoutPersonalizationService,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.not.null;
      expect(personalizationResult!.personalizedComponent!.type).equal(MissingComponent);
      expect(console.error).to.have.been.called.with(
        'Unknown component test. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.'
      );
    });

    it('should log error if componentFactorty is not not found', () => {
      const componentLayout = { componentName: 'test' };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const componentFactory: any = null;
      layoutPersonalizationService.isLoading.returns(false);
      layoutPersonalizationService.getPersonalizedComponent
        .withArgs('testuid')
        .returns(componentLayout);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          layoutPersonalizationService: layoutPersonalizationService,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <TestComponent />
        </ComponentFactoryReactContext.Provider>
      );

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.null;
      expect(console.error).to.have.been.called.with('Unable to resolve componentFactory.');
    });
  });
});

export type StubbedClass<T> = SinonStubbedInstance<T> & T;

// Cannot createStubInstance on class with private members https://github.com/sinonjs/sinon/issues/1963
/**
 * @param constructor
 * @param overrides
 */
export function createSinonStubInstance<T>(
  constructor: StubbableType<T>,
  overrides?: { [K in keyof T]?: SinonStubbedMember<T[K]> }
): StubbedClass<T> {
  const stub = createStubInstance<T>(constructor, overrides);
  return (stub as unknown) as StubbedClass<T>;
}
