﻿import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { getPersonalizedRewriteData, personalizeLayout } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';

class PersonalizePlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context?.params?.path) {
      return props;
    }
    // Get variant for personalization (from path)
    const path = Array.isArray(context.params.path)
      ? context.params.path.join('/')
      : context.params.path ?? '/';

    const personalizeData = getPersonalizedRewriteData(path);

    // Modify layoutData to use specific variant instead of default
    personalizeLayout(props.layoutData, personalizeData.variantId);

    return props;
  }
}

export const personalizePlugin = new PersonalizePlugin();
