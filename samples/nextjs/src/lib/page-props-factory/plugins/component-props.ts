import { ComponentPropsService, ComponentPropsError } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { moduleFactory } from 'temp/componentBuilder';
import { Plugin, isServerSidePropsContext } from '..';

class ComponentPropsPlugin implements Plugin {
  private componentPropsService: ComponentPropsService;

  // Make sure to run this plugin last to ensure that the updated layout data is used
  order = 10;

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

    const errors = Object.keys(props.componentProps)
      .map((id) => {
        const component = props.componentProps[id] as ComponentPropsError;

        return component.error
          ? `\nUnable to get component props for ${component.componentName} (${id}): ${component.error}`
          : '';
      })
      .join('');

    if (errors.length) {
      throw new Error(errors);
    }

    return props;
  }
}

export const componentPropsPlugin = new ComponentPropsPlugin();
