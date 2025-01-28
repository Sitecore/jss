import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  ComponentLibraryLayout,
  ComponentPropsContext,
  SitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';
import config from 'temp/config';

const FEAASRender = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  if (notFound) {
    return <NotFound />;
  }
  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory()}
        layoutData={layoutData}
      >
        <Head>
          <title>Sitecore Component Library</title>
          <link rel="icon" href={`${config.publicUrl}/favicon.ico`} />
          {headLinks.map((headLink) => (
            <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
          ))}
        </Head>
        <ComponentLibraryLayout {...layoutData} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);
  return {
    props,
    // not found when page not requested through editing render api or notFound set in page-props
    notFound: props.notFound || !context.preview,
  };
};

export default FEAASRender;
