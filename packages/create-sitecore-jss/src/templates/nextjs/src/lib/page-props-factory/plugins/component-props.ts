import { ComponentPropsService, ComponentPropsError } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { componentModule } from 'temp/componentFactory';
import { Plugin, isServerSidePropsContext } from '..';

class ComponentPropsPlugin implements Plugin {
  private componentPropsService: ComponentPropsService;

  order = 1;

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
        componentModule,
      });
    } else {
      props.componentProps = await this.componentPropsService.fetchStaticComponentProps({
        layoutData: props.layoutData,
        context,
        componentModule,
      });
    }

    const errors = Object.keys(props.componentProps)
      .map(id => {
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
