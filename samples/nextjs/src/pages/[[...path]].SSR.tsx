import { useEffect } from 'react';
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
import { trackingService } from 'lib/tracking-service';

const SitecorePage = ({
  notFound,
  layoutData,
  componentProps,
  tracked,
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

  useEffect(() => {
    // Do not trigger client tracking when pages are requested by Sitecore XP instance:
    // - no need to track in Edit and Preview modes
    // - in Explore mode all requests will be tracked by Sitecore XP out of the box
    if (isPreview) return;

    if (tracked) return;

    trackingService
      .trackCurrentPage(layoutData.sitecore.context, layoutData.sitecore.route)
      .catch((error: unknown) => console.error('Tracking failed: ' + error));
  }, [isPreview, tracked, layoutData]);

  const context: StyleguideSitecoreContextValue = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

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
    return { props };
  }

  if (props.tracked) {
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
