import { NextPageContext } from 'next';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';
import { SitecoreContext, EditingRequest } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { componentFactory } from 'temp/componentFactory';

const SitecorePage = ({ layoutData }: SitecorePageProps): JSX.Element => {
  if (!layoutData?.sitecore?.route) {
    return <NotFound context={layoutData?.sitecore?.context} />;
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
    locale: data.language,
    layoutData: data.layoutData,
    dictionary: data.dictionary,
    componentProps: {},
  };

  //TODO: implement getInitialProps-compatible component props functionality
  // if (props.layoutData) {
  //   // Retrieve component props using side-effects defined on components level
  //   props.componentProps = await componentPropsService.fetchInitialComponentProps({
  //     layoutData: props.layoutData,
  //     context,
  //     componentModule,
  //   });
  // }

  return props;
};

export default SitecorePage;
