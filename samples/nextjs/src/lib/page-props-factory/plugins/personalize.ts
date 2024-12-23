import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { getPersonalizedRewriteData, personalizeLayout } from '@sitecore-jss/sitecore-jss-nextjs';
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

    return props;
  }
}

export const personalizePlugin = new PersonalizePlugin();
