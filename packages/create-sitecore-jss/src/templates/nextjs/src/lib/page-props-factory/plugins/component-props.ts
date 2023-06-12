import { ComponentPropsService } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { moduleFactory } from 'temp/componentBuilder';
import { Plugin, isServerSidePropsContext } from '..';

class ComponentPropsPlugin implements Plugin {
  private componentPropsService: ComponentPropsService;

  order = 2;

  constructor() {
    this.componentPropsService = new ComponentPropsService();
  }

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!props.layoutData.sitecore.route) return props;

    // Retrieve component props using side-effects defined on components level
    if (isServerSidePropsContext(context)) {
      props.componentProps = await this.componentPropsService.fetchServerSideComponentProps({
        layoutData: props.layoutData,
        context,
        moduleFactory,
      });
    } else {
      props.componentProps = await this.componentPropsService.fetchStaticComponentProps({
        layoutData: props.layoutData,
        context,
        moduleFactory,
      });
    }

    return props;
  }
}

export const componentPropsPlugin = new ComponentPropsPlugin();
