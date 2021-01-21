import { GetServerSideProps } from 'next';
import NotFound from 'components/NotFound';
import { SitecoreContext, ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'components/Layout';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentFactory } from 'temp/componentFactory';
import { StyleguideSitecoreContextValue } from 'lib/component-props';

const SitecorePage = ({ notFound, layoutData, componentProps }: SitecorePageProps): JSX.Element => {
  if (notFound) {
    return <NotFound context={layoutData?.sitecore?.context} />;
  }

  const context: StyleguideSitecoreContextValue = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  const routeData = layoutData.sitecore.route;

  const PageLayout = () => (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext<StyleguideSitecoreContextValue>
        componentFactory={componentFactory}
        context={context}
      >
        <Layout route={routeData} />
      </SitecoreContext>
    </ComponentPropsContext>
  );

  return <PageLayout />;
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  return {
    props,
  };
};

export default SitecorePage;
