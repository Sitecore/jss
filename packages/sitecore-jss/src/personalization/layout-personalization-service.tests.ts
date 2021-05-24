import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { PersonalizationDecisionsService } from './personalization-decisions-service';
import { createStubInstance, stub, SinonStubbedInstance, SinonStub } from 'sinon';
import { LayoutFragmentService } from './layout-fragment-service';
import { LayoutPersonalizationService } from './layout-personalization-service';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';
import { ComponentRendering } from '../layout/models';


use(spies);

describe('LayoutPersonalizationService', () => {

  var consoleErrorSpy: any;
  let layoutPersonalizationService: LayoutPersonalizationService;
  let fetchLayoutFragmentDataStub: SinonStub;
  let getPersonalizationDecisionsStub: SinonStub;
  let layoutPersonalizationUtils: SinonStubbedInstance<LayoutPersonalizationUtils>;
  const context = {
    itemPath: "ip",
    language: "lang",
  };

  beforeEach(() => {
    consoleErrorSpy = spy.on(console, 'error');
    var personalizationDecisionsService = <PersonalizationDecisionsService>{};
    getPersonalizationDecisionsStub = stub();
    personalizationDecisionsService.getPersonalizationDecisions = getPersonalizationDecisionsStub;

    var layoutFragmentService = <LayoutFragmentService>{};
    fetchLayoutFragmentDataStub = stub();
    layoutFragmentService.fetchLayoutFragmentData = fetchLayoutFragmentDataStub;
    layoutPersonalizationUtils = createStubInstance(LayoutPersonalizationUtils)
    layoutPersonalizationUtils.buildPersonalizedFragment.callsFake((uid: string, personalizedFragments: { [key: string]: ComponentRendering | null | undefined; }, _defaultComponent: ComponentRendering | null) => {
      var fragment = personalizedFragments[uid];
      return fragment === undefined ? null : fragment;
    });

    layoutPersonalizationService = new LayoutPersonalizationService(personalizationDecisionsService, layoutFragmentService);
    layoutPersonalizationService.layoutPersonalizationUtils = layoutPersonalizationUtils;
  });

  afterEach(() => {
    spy.restore(console);
  });

  describe('personalize', () => {
    it('should return empty object if personalizedRenderings is empty', async () => {
      let result = await layoutPersonalizationService.personalize({}, []);
      expect(result).to.be.empty;
    });

    it('should return null for hidden and error decision', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      getPersonalizationDecisionsStub.returns(Promise.resolve({
        renderings: {
          "uid1": { variantKey: null },
          "uid2": { errorMessage: "aaaa" }
        }
      }));

      let result = await layoutPersonalizationService.personalize(context, [personalizedRendering1, personalizedRendering2]);

      expect(result).to.deep.equals({ "uid1": null, "uid2": null });
    });

    it('should set undefined for fragment if getting decisions failed', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      var error = new Error("I am Error!");
      getPersonalizationDecisionsStub.returns(Promise.reject(error));

      let result = await layoutPersonalizationService.personalize(context, [personalizedRendering1, personalizedRendering2]);

      expect(consoleErrorSpy).to.have.been.called.with(error);
      expect(result).to.deep.equals({ "uid1": null, "uid2": null });
      expect(layoutPersonalizationUtils.buildPersonalizedFragment.getCall(0).args[1]).to.deep.equals({ "uid1": undefined, "uid2": undefined });
      expect(layoutPersonalizationUtils.buildPersonalizedFragment.getCall(1).args[1]).to.deep.equals({ "uid1": undefined, "uid2": undefined });
    });

    it('should return variant based on fragment', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      getPersonalizationDecisionsStub.returns(Promise.resolve({
        renderings: {
          "uid1": { variantKey: "var1" },
          "uid2": { variantKey: "var2" }
        }
      }));

      fetchLayoutFragmentDataStub.withArgs(
        context.itemPath,
        context.language,
        personalizedRendering1.uid,
        "var1"
        ).returns(Promise.resolve({ fragment: { componentName: "comp1", uid: personalizedRendering1.uid } }));
      fetchLayoutFragmentDataStub.withArgs(
        context.itemPath,
        context.language,
        personalizedRendering2.uid,
        "var2"
        ).returns(Promise.resolve({ fragment: { componentName: "comp2", uid: personalizedRendering2.uid } }));

      let result = await layoutPersonalizationService.personalize(context, [personalizedRendering1, personalizedRendering2]);

      expect(result).to.deep.equals({
        "uid1": { componentName: "comp1", uid: personalizedRendering1.uid },
        "uid2": { componentName: "comp2", uid: personalizedRendering2.uid }
      });
    });

    it('should set undefined for fragment if getting fragment failed', async () => {
      const personalizedRendering1 = {
        componentName: 'cn1',
        uid: 'uid1',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      const personalizedRendering2 = {
        componentName: 'cn2',
        uid: 'uid2',
        personalization: { hiddenByDefault: false, defaultComponent: null }
      };
      getPersonalizationDecisionsStub.returns(Promise.resolve({
        renderings: {
          "uid1": { variantKey: "var1" },
          "uid2": { variantKey: "var2" }
        }
      }));

      fetchLayoutFragmentDataStub.withArgs(
        context.itemPath,
        context.language,
        personalizedRendering1.uid,
        "var1"
        ).returns(Promise.resolve({ fragment: { componentName: "comp1", uid: personalizedRendering1.uid } }));
      var error = new Error("I am Error!");
      fetchLayoutFragmentDataStub.withArgs(
        context.itemPath,
        context.language,
        personalizedRendering2.uid,
        "var2"
        ).returns(Promise.reject(error));

      let result = await layoutPersonalizationService.personalize(context, [personalizedRendering1, personalizedRendering2]);

      expect(result).to.deep.equals({
        "uid1": { componentName: "comp1", uid: personalizedRendering1.uid },
        "uid2": null
      });
      expect(layoutPersonalizationUtils.buildPersonalizedFragment.getCall(1).args[1]).to.deep.equals({
        "uid1": { componentName: "comp1", uid: personalizedRendering1.uid },
        "uid2": undefined
      });
      expect(consoleErrorSpy).to.have.been.called.with(error);
    });

  });
});
