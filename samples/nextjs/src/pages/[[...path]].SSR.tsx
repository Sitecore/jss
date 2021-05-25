import { useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import NotFound from 'src/NotFound';
import {
  SitecoreContext,
  ComponentPropsContext,
  handleExperienceEditorFastRefresh,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'src/Layout';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentFactory } from 'temp/componentFactory';
import { StyleguideSitecoreContextValue } from 'lib/component-props';
import { trackingService } from 'lib/tracking-service-factory';
import { layoutPersonalizationService } from 'lib/layout-personalization-service-factory';

const SitecorePage = ({
  notFound,
  layoutData,
  componentProps,
  isPreview,
}: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Experience Editor does not support Fast Refresh need to refresh EE chromes after Fast Refresh finished
    handleExperienceEditorFastRefresh();
  }, []);

  if (notFound || !layoutData?.sitecore?.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const context: StyleguideSitecoreContextValue = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  // Start loading personalization before render occurs, personalization loading components rely in service state
  // Do not load personalization twice for pages with query, see Caveats for dynamic routes in Next.js doc
  useMemo(() => {
    const disconnectedMode =
      layoutData.sitecore.route &&
      layoutData.sitecore.route.layoutId === 'available-in-connected-mode';
    if (!disconnectedMode) {
      // Load personalization client side only
      if (process.browser) {
        // Do not trigger client tracking when pages are requested by Sitecore XP instance:
        // - no need to track in Edit and Preview modes
        // - in Explore mode all requests will be tracked by Sitecore XP out of the box
        if (!isPreview) {
          layoutPersonalizationService.loadPersonalization(context, context.route).then((p) => {
            if (!p.hasPersonalizationComponents) {
              if (!layoutData.sitecore.tracked) {
                trackingService
                  .trackCurrentPage(layoutData.sitecore.context, layoutData.sitecore.route)
                  .catch((error) => console.error('Tracking failed: ' + error));
              }
            }
          });
        }
      }
    }
  }, [isPreview, layoutData]);

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext<StyleguideSitecoreContextValue>
        componentFactory={componentFactory}
        context={context}
      >
        <Layout context={context} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  if (!props.notFound) {
    return {
      props,
    };
  }

  if (props.layoutData?.sitecore.tracked) {
    trackingService.signalSkipNextPage(context.res);
  }

  // Returns custom 404 page with a status code of 404 when notFound: true
  // Note we can't simply return props.notFound due to an issue in Next.js (https://github.com/vercel/next.js/issues/22472)
  return {
    props,
    notFound: true,
  };
};

export default SitecorePage;
