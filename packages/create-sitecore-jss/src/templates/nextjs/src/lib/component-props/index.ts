import {
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
  LayoutServiceData,
  ComponentPropsService,
  ComponentPropsCollection,
  ComponentPropsError,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { isServerSidePropsContext } from 'lib/page-props-factory';
import { moduleFactory } from 'temp/componentBuilder';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

/**
 * Fetch component props for a given layout data and context
 * @param {LayoutServiceData} layoutData - The layout data to fetch component props for
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context - The context to fetch component props for
 * @returns {ComponentPropsCollection} The component props
 * @throws {Error} If there are errors during component props fetching
 */
export async function fetchComponentProps(
  layoutData: LayoutServiceData,
  context: GetServerSidePropsContext | GetStaticPropsContext
): Promise<ComponentPropsCollection> {
  const service = new ComponentPropsService();

  const componentProps = isServerSidePropsContext(context)
    ? await service.fetchServerSideComponentProps({ layoutData, context, moduleFactory })
    : await service.fetchStaticComponentProps({ layoutData, context, moduleFactory });

  const errors = Object.keys(componentProps)
    .map(id => {
      const c = componentProps[id] as ComponentPropsError;
      return c?.error
        ? `\nUnable to get component props for ${c.componentName} (${id}): ${c.error}`
        : '';
    })
    .join('');

  if (errors.length) {
    throw new Error(errors);
  }

  return componentProps;
}
