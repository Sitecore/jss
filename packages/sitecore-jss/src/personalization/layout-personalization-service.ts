import { ComponentRendering, PersonalizableComponentRendering, RouteData } from '../layout/models';
import {
  PersonalizationDecisionData,
  PersonalizationDecisionsService,
} from './personalization-decisions-service';
import { LayoutFragmentService } from './layout-fragment-service';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';
import {
  SitecorePersonalizationContext,
  SitecorePersonalizationContextState,
} from './layout-personalization-context';

export interface PersonalizationContext {
  /**
   * The route path
   */
  routePath: string;
  /**
   * The language
   */
  language: string;
}

/**
 * The layout personalization service that provides the asynchronous API
 * to initiate the personalization and load personalized components
 */
export class LayoutPersonalizationService {
  constructor(
    protected personalizationDecisionsService: PersonalizationDecisionsService,
    protected layoutFragmentService: LayoutFragmentService,
    protected layoutPersonalizationUtils: LayoutPersonalizationUtils
  ) {}

  /**
   * Fetches the personalized data.
   * @param {PersonalizationContext} context The context.
   * @param {RouteData} route The route.
   */
  startPersonalization(
    context: PersonalizationContext,
    route: RouteData
  ): SitecorePersonalizationContextState | undefined {
    const personalizedRenderings = this.layoutPersonalizationUtils.getPersonalizableComponents(
      route.placeholders
    );
    if (!personalizedRenderings.length) {
      return undefined;
    }

    const personalizationOperation = this.personalizeComponents(
      {
        routePath: context.routePath,
        language: context.language,
      },
      personalizedRenderings
    );
    const isTracked = this.personalizationDecisionsService.isTrackingEnabled();

    return new SitecorePersonalizationContext(personalizationOperation, isTracked);
  }

  /**
   * Personalizes components.
   * @param {PersonalizationContext} context The context.
   * @param {PersonalizableComponentRendering[]} personalizableRenderings The personalizable components.
   * @returns {Object.<string, ComponentRendering | null>} The personalized components.
   */
  async personalizeComponents(
    context: PersonalizationContext,
    personalizableRenderings: PersonalizableComponentRendering[]
  ): Promise<{ [key: string]: ComponentRendering | null }> {
    if (personalizableRenderings.length === 0) {
      return {};
    }

    const personalizedRenderingIds = personalizableRenderings.map((r) => r.uid);
    let personalizedFragments: { [key: string]: ComponentRendering | null | undefined } = {};

    try {
      const personalizationDecisionsResult = await this.personalizationDecisionsService.getPersonalizationDecisions(
        {
          routePath: context.routePath,
          language: context.language,
          renderingIds: personalizedRenderingIds,
        }
      );
      personalizedFragments = await this.resolveFragments(personalizationDecisionsResult, context);
    } catch (error) {
      // catch all errors on getting a personalization decision
      console.debug(error);
      // default will be used for unresolved fragments
      personalizedRenderingIds.forEach((id) => (personalizedFragments[id] = undefined));
    }

    const result: { [key: string]: ComponentRendering | null } = {};
    personalizableRenderings.forEach((pr) => {
      result[pr.uid] = this.layoutPersonalizationUtils.buildPersonalizedFragment(
        pr.uid,
        personalizedFragments,
        pr.personalization.defaultComponent
      );
    });

    return result;
  }

  /**
   * Resolves the fragments.
   * @param {PersonalizationDecisionData} personalizationDecisionsResult The personalization decisions.
   * @param {PersonalizationContext} context The context.
   * @returns {Object.<string, ComponentRendering | null | undefined>} The fragments.
   */
  private async resolveFragments(
    personalizationDecisionsResult: PersonalizationDecisionData,
    context: PersonalizationContext
  ): Promise<{ [key: string]: ComponentRendering | null | undefined }> {
    const personalizedFragments: { [key: string]: ComponentRendering | null | undefined } = {};
    const renderingsDecisions = personalizationDecisionsResult.renderings;
    const personalizedFragmentsRequests: Promise<void>[] = [];

    for (const [renderingId, decision] of Object.entries(renderingsDecisions)) {
      const errorMessage = decision?.errorMessage;
      if (errorMessage) {
        console.debug(errorMessage);
      }

      const variantKey = decision?.variantKey;
      if (variantKey) {
        // load fragments in parallel
        personalizedFragmentsRequests.push(
          this.layoutFragmentService
            .fetchLayoutFragmentData(context.routePath, context.language, renderingId, variantKey)
            .then((fr) => {
              personalizedFragments[renderingId] = fr.fragment;
            })
            .catch((error) => {
              console.debug(error);

              // default will be used in case failed to resolve the fragment
              personalizedFragments[renderingId] = undefined;
            })
        );
      } else if (variantKey === null) {
        // hidden by personalization
        personalizedFragments[renderingId] = null;
      } else {
        // was not able to resolve decision for the rendering, default will be used
        personalizedFragments[renderingId] = undefined;
      }
    }

    await Promise.all(personalizedFragmentsRequests);

    return personalizedFragments;
  }
}
