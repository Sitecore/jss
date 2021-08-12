import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NotFound from 'src/NotFound';
import {
  SitecoreContext,
  ComponentPropsContext,
  handleEditorFastRefresh,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'src/Layout';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentFactory } from 'temp/componentFactory';
import { StyleguideSitecoreContextValue } from 'lib/component-props';

const SitecorePage = ({ notFound, layoutData, componentProps }: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh EE chromes after Fast Refresh finished
    handleEditorFastRefresh();
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

  return {
    props,
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

export default SitecorePage;
