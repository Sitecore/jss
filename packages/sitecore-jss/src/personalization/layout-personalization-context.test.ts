/* eslint-disable no-unused-expressions */

import { expect, use } from 'chai';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';
import { SitecorePersonalizationContext } from './layout-personalization-context';

use(spies);
use(chaiAsPromised);

describe('SitecorePersonalizationContext', () => {
  describe('isTracked', () => {
    [true, false].forEach((isTracked) => {
      it(`should return ${isTracked} which passed to ctor`, () => {
        const personalizationContext = new SitecorePersonalizationContext(
          Promise.resolve({}),
          isTracked
        );
        expect(personalizationContext.isTracked).equal(isTracked);
      });
    });
  });

  describe('ensurePersonalizedComponentLoaded', () => {
    it('should return error if personalizationOperation is rejected', () => {
      const personalizationContext = new SitecorePersonalizationContext(
        Promise.reject('testError'),
        true
      );
      expect(personalizationContext.ensurePersonalizedComponentLoaded('test')).to.be.rejectedWith(
        'testError'
      );
    });

    it('should return component after personalizationOperation is resolved', async () => {
      const personalizationContext = new SitecorePersonalizationContext(
        Promise.resolve({
          test1: { componentName: 'cn1' },
        }),
        true
      );

      const result = await personalizationContext.ensurePersonalizedComponentLoaded('test1');

      expect(result).to.be.deep.equal({ componentName: 'cn1' });
    });

    it('should return null if component not found in personalizationOperation result', async () => {
      const personalizationContext = new SitecorePersonalizationContext(
        Promise.resolve({
          test1: { componentName: 'cn1' },
        }),
        true
      );

      const result = await personalizationContext.ensurePersonalizedComponentLoaded('test2');

      expect(result).to.be.null;
    });
  });

  describe('isLoading', () => {
    it('should return true if components is not yet resolved', () => {
      const personalizationContext = new SitecorePersonalizationContext(
        new Promise((resolve) => setTimeout(() => resolve({}), 1)),
        true
      );

      const result = personalizationContext.isLoading('uid1');

      expect(result).is.true;
    });

    it('should return false if components are resolved', async () => {
      const personalizationOperation = Promise.resolve({
        uid1: {
          componentName: 'cn1',
          uid: 'uid1',
          personalization: { hiddenByDefault: false, defaultComponent: null },
        },
      });
      const personalizationContext = new SitecorePersonalizationContext(
        personalizationOperation,
        true
      );
      await personalizationOperation;

      const result = personalizationContext.isLoading('uid1');

      expect(result).is.false;
    });
  });

  describe('getPersonalizedComponent', () => {
    it('should return undefined if components was not resolved', async () => {
      const personalizationOperation = Promise.reject('error');
      const personalizationContext = new SitecorePersonalizationContext(
        personalizationOperation,
        true
      );
      try {
        await personalizationOperation;
      } catch {
        // wait personalization operation processed
      }

      const result = personalizationContext.getPersonalizedComponent('testUid');

      expect(result).is.undefined;
    });

    it('should return undefined while personalizationOperation is resolving', () => {
      const personalizationContext = new SitecorePersonalizationContext(
        new Promise((resolve) =>
          setTimeout(() => resolve({ testUid: { componentName: 'cn' } }), 1)
        ),
        true
      );

      const result = personalizationContext.getPersonalizedComponent('testUid');

      expect(result).is.undefined;
    });

    it('should return undefined if component is not defined', async () => {
      const personalizationOperation = Promise.resolve({
        testUid: { componentName: 'cn2', uid: 'testUid' },
      });
      const personalizationContext = new SitecorePersonalizationContext(
        personalizationOperation,
        true
      );
      await personalizationOperation;

      const result = personalizationContext.getPersonalizedComponent('otherTestUid');

      expect(result).is.undefined;
    });

    it('should return undefined if component for specified uid not defined', async () => {
      const personalizationOperation = Promise.resolve({
        test2: { componentName: 'cn2' },
      });
      const personalizationContext = new SitecorePersonalizationContext(
        personalizationOperation,
        true
      );
      await personalizationOperation;

      const result = personalizationContext.getPersonalizedComponent('test');

      expect(result).is.undefined;
    });

    it('should return component if component for specified uid is resolved', async () => {
      const personalizationOperation = Promise.resolve({
        test: { componentName: 'cn2' },
      });
      const personalizationContext = new SitecorePersonalizationContext(
        personalizationOperation,
        true
      );
      await personalizationOperation;

      const result = personalizationContext.getPersonalizedComponent('test');

      expect(result).to.deep.equals({ componentName: 'cn2' });
    });
  });
});
