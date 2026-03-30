import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import {
  getPersonalizedRewriteData,
  personalizeLayout,
  PERSONALIZE_TOKENS_HEADER,
  replaceTokensInObject,
  TokenMap,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';

class PersonalizePlugin implements Plugin {
  order = 3;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    const path =
      context.params === undefined
        ? '/'
        : Array.isArray(context.params.path)
        ? context.params.path.join('/')
        : context.params.path ?? '/';

    // Get variant(s) for personalization (from path)
    const personalizeData = getPersonalizedRewriteData(path);

    // Modify layoutData to use specific variant(s) instead of default
    // This will also set the variantId on the Sitecore context so that it is accessible here
    personalizeLayout(
      props.layoutData,
      personalizeData.variantId,
      personalizeData.componentVariantIds
    );

    // Apply personalization tokens returned by the decision table (if any).
    // The middleware encodes them as base64 JSON in the x-sc-personalize-tokens header.
    // This block must run after personalizeLayout() so tokens are applied to the selected variant.
    try {
      const tokensHeader = (context as GetServerSidePropsContext).req?.headers[
        PERSONALIZE_TOKENS_HEADER
      ] as string | undefined;
      if (tokensHeader) {
        const decoded: Record<string, Record<string, unknown>> = JSON.parse(
          Buffer.from(tokensHeader, 'base64').toString('utf-8')
        );
        // Merge all per-variant token maps, validating that every value is a
        // string. This avoids the Object.assign spread path that can trigger
        // the __proto__ setter when JSON-parsed data contains that key.
        const mergedTokens: TokenMap = {};
        for (const variantTokens of Object.values(decoded)) {
          for (const [k, v] of Object.entries(variantTokens)) {
            if (
              k !== '__proto__' &&
              k !== 'constructor' &&
              k !== 'prototype' &&
              typeof v === 'string'
            ) {
              if (mergedTokens[k] !== undefined) {
                console.warn(
                  `[Personalize] Token key collision: "${k}" overwritten by value from another decision table.`
                );
              }
              mergedTokens[k] = v;
            }
          }
        }
        if (Object.keys(mergedTokens).length > 0) {
          const replaced = replaceTokensInObject(props.layoutData, mergedTokens, {
            removeUnmatched: true,
            onUnmatched: (key) =>
              console.warn(`[Personalize] Unmatched token "${key}" has no value or fallback.`),
          });
          // Direct property assignment rather than Object.assign to make clear that
          // layoutData.sitecore is the only subtree that contains token placeholders.
          props.layoutData.sitecore = replaced.sitecore;
        }
      }
    } catch (e) {
      console.warn('Failed to apply personalize tokens:', e);
    }

    return props;
  }
}

export const personalizePlugin = new PersonalizePlugin();
