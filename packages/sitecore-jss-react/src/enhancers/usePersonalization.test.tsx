/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/check-param-names */

import React from 'react';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';
import { createStubInstance, stub, SinonStubbedInstance, SinonStub } from 'sinon';
import { usePersonalization, UsePersonalizationResult } from '../enhancers/usePersonalization';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';
import { SitecorePersonalizationContext } from '@sitecore-jss/sitecore-jss';
import { MissingComponent } from '../components/MissingComponent';
import { SitecorePersonalizationReactContext } from './withSitecorePersonalizationContext';

use(spies);

describe('usePersonalization', () => {
  let personalizationContext: SinonStubbedInstance<SitecorePersonalizationContext>;
  let componentFactory: SinonStub;

  beforeEach(() => {
    spy.on(console, 'error');
    personalizationContext = createStubInstance(SitecorePersonalizationContext);
    componentFactory = stub();
  });

  afterEach(() => {
    spy.restore(console);
  });

  describe('usePersonalization', () => {
    it('should return personalizedComponent and isLoading from personalization context', () => {
      const componentLayout = { componentName: 'test' };
      personalizationContext.isLoading.withArgs('testuid').returns(false);
      personalizationContext.getPersonalizedComponent.withArgs('testuid').returns(componentLayout);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          componentFactory: componentFactory,
        });

        return <div></div>;
      };

      const wrapper = mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
            <TestComponent />
          </SitecorePersonalizationReactContext.Provider>
        </ComponentFactoryReactContext.Provider>
      );

      expect(wrapper).to.have.length(1);

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.not.null;
      expect(personalizationResult!.personalizedComponent!.props!.rendering).equal(componentLayout);
    });

    it('should return loaded personalizedComponent', () => {
      const componentLayout = { componentName: 'test' };
      personalizationContext.isLoading.returns(true);

      personalizationContext.ensurePersonalizedComponentLoaded.withArgs('testuid').callsFake(() => {
        personalizationContext.isLoading.withArgs('testuid').returns(false);
        personalizationContext.getPersonalizedComponent
          .withArgs('testuid')
          .returns(componentLayout);
        return Promise.resolve(componentLayout);
      });
      componentFactory.withArgs(componentLayout.componentName).returns('div');

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          componentFactory: componentFactory,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
            <TestComponent />
          </SitecorePersonalizationReactContext.Provider>
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
      personalizationContext.isLoading.returns(false);
      personalizationContext.getPersonalizedComponent.withArgs('testuid').returns(componentLayout);

      componentFactory.withArgs(componentLayout.componentName).returns(null);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          componentFactory: componentFactory,
          missingComponentComponent: missingComponentComponent,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
            <TestComponent />
          </SitecorePersonalizationReactContext.Provider>
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
      personalizationContext.isLoading.returns(false);
      personalizationContext.getPersonalizedComponent.withArgs('testuid').returns(componentLayout);

      componentFactory.withArgs(componentLayout.componentName).returns(null);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          componentFactory: componentFactory,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
            <TestComponent />
          </SitecorePersonalizationReactContext.Provider>
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

    it('should log error if componentFactory is not not found', () => {
      const componentLayout = { componentName: 'test' };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const componentFactory: any = null;
      personalizationContext.isLoading.returns(false);
      personalizationContext.getPersonalizedComponent.withArgs('testuid').returns(componentLayout);

      let personalizationResult: UsePersonalizationResult | null = null;
      const TestComponent = () => {
        personalizationResult = usePersonalization({
          uid: 'testuid',
          componentFactory: componentFactory,
        });

        return <div></div>;
      };

      mount(
        <ComponentFactoryReactContext.Provider value={componentFactory}>
          <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
            <TestComponent />
          </SitecorePersonalizationReactContext.Provider>
        </ComponentFactoryReactContext.Provider>
      );

      expect(personalizationResult).is.not.null;
      expect(personalizationResult!.isLoading).is.false;
      expect(personalizationResult!.personalizedComponent).is.null;
      expect(console.error).to.have.been.called.with('Unable to resolve componentFactory.');
    });
  });
});
