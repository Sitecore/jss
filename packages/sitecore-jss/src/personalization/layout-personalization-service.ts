import {
  ComponentRendering,
  PersonalizedComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '../layout/models';
import {
  PersonalizationDecisionData,
  PersonalizationDecisionsService,
} from './personalization-decisions-service';
import { LayoutFragmentService, LayoutFragmentData } from './layout-fragment-service';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';

export interface PersonalizationResult {
  route?: RouteData;
  isRoutePersonalized: boolean;
}

export interface PersonalizationLoadResult {
  hasPersonalizationComponents: boolean;
  personalizedFragments?: { [key: string]: ComponentRendering | null };
}

export class LayoutPersonalizationService {
  private layoutPersonalizationUtils = new LayoutPersonalizationUtils();
  private personalizationResult: Promise<{
    [key: string]: ComponentRendering | null;
  }> | null = null;
  private personalizedComponents: { [key: string]: ComponentRendering | null } | null = null;

  constructor(
    private personalizationDecisionsService: PersonalizationDecisionsService,
    private layoutFragmentService: LayoutFragmentService
  ) {}

  loadPersonalization(
    context: LayoutServiceContext,
    route: RouteData
  ): Promise<PersonalizationLoadResult> {
    // clear personalization before getting new one
    this.personalizationResult = null;
    this.personalizedComponents = null;

    const personalizedRenderings = this.layoutPersonalizationUtils.getPersonalizedComponents(
      route.placeholders
    );

    if (!personalizedRenderings.length) {
      return Promise.resolve({ hasPersonalizationComponents: false });
    }

    this.personalizationResult = this.personalize(context, personalizedRenderings);

    return new Promise<PersonalizationLoadResult>((resolve, reject) => {
      this.personalizationResult
        ?.then((pr) => {
          this.personalizedComponents = pr;
          resolve({ personalizedFragments: pr, hasPersonalizationComponents: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPersonalizedComponent(componentUid: string): ComponentRendering | null {
    return this.personalizedComponents && (this.personalizedComponents[componentUid] ?? null);
  }

  isLoading() {
    return this.personalizedComponents === null;
  }

  loadPersonalizedComponent(componentUid: string): Promise<ComponentRendering | null> {
    if (this.personalizationResult === null) {
      return Promise.reject(
        'loadPersonalization should be called before getting personalized component'
      );
    }

    return new Promise<ComponentRendering | null>((resolve, reject) => {
      this.personalizationResult
        ?.then((pr) => {
          resolve(pr[componentUid] ?? null);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async personalize(
    context: LayoutServiceContext,
    personalizedRenderings: PersonalizedComponentRendering[]
  ): Promise<{ [key: string]: ComponentRendering | null }> {
    if (personalizedRenderings.length === 0) {
      return {};
    }
    const personalizedRenderingIds = personalizedRenderings.map((r) => r.uid);
    let personalizedFragments: { [key: string]: ComponentRendering | null | undefined } = {};
    try {
      const personalizationDecisionsResult = await this.personalizationDecisionsService.getPersonalizationDecisions(
        {
          routePath: context.itemPath as string,
          language: context.language as string,
          renderingIds: personalizedRenderingIds,
        }
      );
      personalizedFragments = await this.resolveFragments(personalizationDecisionsResult, context);
    } catch (error) {
      console.error(error);
      // default will be used for undefined fragments
      personalizedRenderingIds.forEach((id) => (personalizedFragments[id] = undefined));
    }

    const result: { [key: string]: ComponentRendering | null } = {};
    personalizedRenderings.forEach((pr) => {
      result[pr.uid] = this.layoutPersonalizationUtils.buildPersonalizedFragment(
        pr.uid,
        personalizedFragments,
        pr.personalization.defaultComponent
      );
    });
    return result;
  }

  private async resolveFragments(
    personalizationDecisionsResult: PersonalizationDecisionData,
    context: LayoutServiceContext
  ) {
    const personalizedFragments: { [key: string]: ComponentRendering | null | undefined } = {};
    const renderingsDecisions = personalizationDecisionsResult.renderings;
    const personalizedFragmentsRequests: Promise<void | LayoutFragmentData>[] = [];

    for (const [renderingId, decision] of Object.entries(renderingsDecisions)) {
      const variantKey = decision?.variantKey;
      if (variantKey) {
        // load fragments in parallel
        personalizedFragmentsRequests.push(
          this.layoutFragmentService
            .fetchLayoutFragmentData(
              context.itemPath as string,
              context.language as string,
              renderingId,
              variantKey
            )
            .then((fr) => {
              personalizedFragments[renderingId] = fr.fragment;
            })
            .catch((error) => {
              console.error(error);
              personalizedFragments[renderingId] = undefined; // default will be used for undefined fragments
            })
        );
      } else if (variantKey === null) {
        // hidden by personalization
        personalizedFragments[renderingId] = null;
      } else {
        personalizedFragments[renderingId] = undefined; // was not able to resolve decisions for this rendering, default will be used
      }
    }

    // wait all fragments is requisted, no fail on error, default should be applied
    // Promise.allSettled simple polifil.
    await Promise.all(
      personalizedFragmentsRequests.map((p) =>
        p.then(
          () => {
            /* do nothing. */
          },
          () => {
            /* do nothing. */
          }
        )
      )
    );
    return personalizedFragments;
  }
}
