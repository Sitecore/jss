import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SitecorePageProps } from 'lib/page-props';
import { fetchComponentProps } from 'lib/component-props';
import { Plugin } from '..';

class ComponentPropsPlugin implements Plugin {
  // Make sure to run this plugin last to ensure that the updated layout data is used
  order = 10;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!props.layoutData.sitecore.route) return props;

    // Retrieve component props using side-effects defined on components level
    props.componentProps = await fetchComponentProps(props.layoutData, context);

    return props;
  }
}

export const componentPropsPlugin = new ComponentPropsPlugin();
