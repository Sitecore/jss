import { NextPageContext } from 'next';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';
import { SitecoreContext, ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentFactory } from 'temp/componentFactory';

const SitecorePage = ({ notFound, layoutData, componentProps }: SitecorePageProps): JSX.Element => {
  if (notFound) {
    return <NotFound context={layoutData?.sitecore?.context} />;
  }

  const context = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  const PageLayout = () => (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext componentFactory={componentFactory} context={context}>
        <Layout route={layoutData.sitecore.route} />
      </SitecoreContext>
    </ComponentPropsContext>
  );

  return <PageLayout />;
};

SitecorePage.getInitialProps = async (context: NextPageContext) => {
  const props = await sitecorePagePropsFactory.createForEditing(context);
  return props;
};

export default SitecorePage;
