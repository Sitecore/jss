/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';
import { PersonalizationDecisionsService } from './personalization-decisions-service';
import {
  createStubInstance,
  stub,
  SinonStubbedInstance,
  StubbableType,
  SinonStubbedMember,
} from 'sinon';
import { LayoutFragmentService } from './layout-fragment-service';
import {
  LayoutPersonalizationService,
  PersonalizationContext,
} from './layout-personalization-service';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';
import { ComponentRendering } from '../layout/models';

use(spies);
use(chaiAsPromised);

describe('LayoutPersonalizationService', () => {
  let layoutPersonalizationService: LayoutPersonalizationService;
  let layoutFragmentServiceStub: SinonStubbedInstance<LayoutFragmentService> &
    LayoutFragmentService;
  let personalizationDecisionsServiceStub: StubbedClass<PersonalizationDecisionsService>;
  let layoutPersonalizationUtilsStub: StubbedClass<LayoutPersonalizationUtils>;
  const context: PersonalizationContext = {
    routePath: 'ip',
    language: 'lang',
    layoutDeviceId: 'deviceId',
  };

  beforeEach(() => {
    spy.on(console, 'debug');
    personalizationDecisionsServiceStub = createSinonStubInstance(PersonalizationDecisionsService);
    layoutFragmentServiceStub = stub({} as LayoutFragmentService);
    layoutFragmentServiceStub.fetchLayoutFragmentData = stub();
    layoutPersonalizationUtilsStub = createSinonStubInstance(LayoutPersonalizationUtils);
    layoutPersonalizationUtilsStub.buildPersonalizedFragment.callsFake(
      (
        uid: string,
        personalizedFragments: { [key: string]: ComponentRendering | null | undefined }
      ) => {
        const fragment = personalizedFragments[uid];
        return fragment === undefined ? null : fragment;
      }
    );

    layoutPersonalizationService = new LayoutPersonalizationService(
      personalizationDecisionsServiceStub,
      layoutFragmentServiceStub,
      layoutPersonalizationUtilsStub
    );
  });

  afterEach(() => {
    spy.restore(console);
  });

  describe('startPersonalization', () => {
    it('should return undefined if not personalizable components', async () => {
      const routeData = { name: 'testroute', placeholders: { 'jss-main': [] } };
      layoutPersonalizationUtilsStub.getPersonalizableComponents
        .withArgs(routeData.placeholders)
        .returns([]);

      const result = layoutPersonalizationService.startPersonalization(context, routeData);

      expect(result).be.undefined;
    });
    it('should set state and return result', async () => {
      const routeData = { name: 'testroute', placeholders: { 'jss-main': [] } };
      const personalizedRendering = [
        {
          componentName: 'cn1',
          uid: 'uid1',
          personalization: { hiddenByDefault: false, defaultComponent: null },
        },
      ];
      layoutPersonalizationUtilsStub.getPersonalizableComponents
        .withArgs(routeData.placeholders)
        .returns(personalizedRendering);
      const personalizeComponents = { uid1: { componentName: 'cm1' } };
      const personalizeResult = Promise.resolve(personalizeComponents);
      layoutPersonalizationService.personalizeComponents = stub()
        .withArgs(context, personalizedRendering)
        .returns(personalizeResult);
      personalizationDecisionsServiceStub.isTrackingEnabled.returns(true);

      const result = layoutPersonalizationService.startPersonalization(context, routeData);
      await personalizeResult;

      expect(result).not.undefined;
      expect(result!.isTracked).is.true;
      expect(result!.isLoading('uid1')).to.be.false;
      expect(result!.getPersonalizedComponent('uid1')).to.be.deep.equal(personalizeComponents.uid1);
    });
  });

  describe('personalizeComponents', () => {
    it('should return empty object if personalizedRenderings is empty', async () => {
      const result = await layoutPersonalizationService.personalizeComponents(context, []);

      expect(result).deep.equals({});
    });

    it('should return null for hidden and error decision', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const errorMessage = 'aaaa';
      personalizationDecisionsServiceStub.getPersonalizationDecisions.returns(
        Promise.resolve({
          renderings: {
            uid1: { variantKey: null },
            uid2: { errorMessage: errorMessage },
          },
        })
      );

      const result = await layoutPersonalizationService.personalizeComponents(context, [
        personalizedRendering1,
        personalizedRendering2,
      ]);

      expect(console.debug).to.have.been.called.with(errorMessage);
      expect(result).to.deep.equals({ uid1: null, uid2: null });
    });

    it('should set undefined for fragment if getting decisions failed', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const error = new Error('I am Error!');
      personalizationDecisionsServiceStub.getPersonalizationDecisions.returns(
        Promise.reject(error)
      );

      const result = await layoutPersonalizationService.personalizeComponents(context, [
        personalizedRendering1,
        personalizedRendering2,
      ]);

      expect(console.debug).to.have.been.called.with(error);
      expect(result).to.deep.equals({ uid1: null, uid2: null });
      expect(
        layoutPersonalizationUtilsStub.buildPersonalizedFragment.getCall(0).args[1]
      ).to.deep.equals({ uid1: undefined, uid2: undefined });
      expect(
        layoutPersonalizationUtilsStub.buildPersonalizedFragment.getCall(1).args[1]
      ).to.deep.equals({ uid1: undefined, uid2: undefined });
    });

    it('should return variant based on fragment', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      personalizationDecisionsServiceStub.getPersonalizationDecisions.returns(
        Promise.resolve({
          renderings: {
            uid1: { variantKey: 'var1' },
            uid2: { variantKey: 'var2' },
          },
        })
      );

      layoutFragmentServiceStub.fetchLayoutFragmentData
        .withArgs(context.routePath, context.language, personalizedRendering1.uid, 'var1')
        .returns(
          Promise.resolve({ fragment: { componentName: 'comp1', uid: personalizedRendering1.uid } })
        );
      layoutFragmentServiceStub.fetchLayoutFragmentData
        .withArgs(context.routePath, context.language, personalizedRendering2.uid, 'var2')
        .returns(
          Promise.resolve({ fragment: { componentName: 'comp2', uid: personalizedRendering2.uid } })
        );

      const result = await layoutPersonalizationService.personalizeComponents(context, [
        personalizedRendering1,
        personalizedRendering2,
      ]);

      expect(result).to.deep.equals({
        uid1: { componentName: 'comp1', uid: personalizedRendering1.uid },
        uid2: { componentName: 'comp2', uid: personalizedRendering2.uid },
      });
    });

    it('should set undefined for fragment if getting fragment failed', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null },
      };
      personalizationDecisionsServiceStub.getPersonalizationDecisions.returns(
        Promise.resolve({
          renderings: {
            uid1: { variantKey: 'var1' },
            uid2: { variantKey: 'var2' },
          },
        })
      );

      layoutFragmentServiceStub.fetchLayoutFragmentData
        .withArgs(context.routePath, context.language, personalizedRendering1.uid, 'var1')
        .returns(
          Promise.resolve({ fragment: { componentName: 'comp1', uid: personalizedRendering1.uid } })
        );
      const error = new Error('I am Error!');
      layoutFragmentServiceStub.fetchLayoutFragmentData
        .withArgs(context.routePath, context.language, personalizedRendering2.uid, 'var2')
        .returns(Promise.reject(error));

      const result = await layoutPersonalizationService.personalizeComponents(context, [
        personalizedRendering1,
        personalizedRendering2,
      ]);

      expect(result).to.deep.equals({
        uid1: { componentName: 'comp1', uid: personalizedRendering1.uid },
        uid2: null,
      });
      expect(
        layoutPersonalizationUtilsStub.buildPersonalizedFragment.getCall(1).args[1]
      ).to.deep.equals({
        uid1: { componentName: 'comp1', uid: personalizedRendering1.uid },
        uid2: undefined,
      });
      expect(console.debug).to.have.been.called.with(error);
    });
  });
});

export type StubbedClass<T> = SinonStubbedInstance<T> & T;

// Cannot createStubInstance on class with private members https://github.com/sinonjs/sinon/issues/1963
export const createSinonStubInstance = <T>(
  constructor: StubbableType<T>,
  overrides?: { [K in keyof T]?: SinonStubbedMember<T[K]> }
): StubbedClass<T> => {
  const stub = createStubInstance<T>(constructor, overrides);
  return (stub as unknown) as StubbedClass<T>;
};
