import { NextPageContext } from 'next';
import Error from 'next/error';
import Layout from 'components/Layout';
import {
  SitecoreContext,
  EditingRequest,
  ComponentPropsService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { componentFactory, componentModule } from 'temp/componentFactory';

const componentPropsService = new ComponentPropsService();

const SitecorePage = ({ layoutData }: SitecorePageProps): JSX.Element => {
  if (!layoutData?.sitecore?.route) {
    // layoutData will be missing for an invalid path
    return <Error statusCode={404} />;
  }

  const context = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  const PageLayout = () => (
    <SitecoreContext componentFactory={componentFactory} context={context}>
      <Layout route={layoutData.sitecore.route} />
    </SitecoreContext>
  );

  return <PageLayout />;
};

SitecorePage.getInitialProps = async (context: NextPageContext) => {
  const { req } = context;

  // Grab Experience Editor data which has been stashed on the request
  const data = (req as EditingRequest).editingData;

  const props: SitecorePageProps = {
    locale: data?.language ?? 'en',
    layoutData: data?.layoutData || null,
    dictionary: data?.dictionary || null,
    componentProps: {},
  };

  if (props?.layoutData?.sitecore.route) {
    // Retrieve component props using side-effects defined on components level
    props.componentProps = await componentPropsService.fetchInitialComponentProps({
      layoutData: props.layoutData,
      context,
      componentModule,
    });
  }

  return props;
};

export default SitecorePage;
