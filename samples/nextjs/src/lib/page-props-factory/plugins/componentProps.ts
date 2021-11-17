import { ComponentPropsService } from '@sitecore-jss/sitecore-jss-nextjs';
import { componentModule } from 'temp/componentFactory';
import { Plugin, isServerSidePropsContext } from '../';

class ComponentPropsPlugin implements Plugin {
  private componentPropsService: ComponentPropsService;

  base = false;

  constructor() {
    this.componentPropsService = new ComponentPropsService();
  }

  async exec(props, context) {
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

    return props;
  }
}

export const componentPropsPlugin = new ComponentPropsPlugin();
