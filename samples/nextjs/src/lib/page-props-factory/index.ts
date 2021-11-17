import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SitecorePageProps } from 'lib/page-props';
import * as plugins from 'temp/page-props-factory-plugins';

/**
 * Determines whether context is GetServerSidePropsContext (SSR) or GetStaticPropsContext (SSG)
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context
 */
export const isServerSidePropsContext = function (
  context: GetServerSidePropsContext | GetStaticPropsContext
): context is GetServerSidePropsContext {
  return (<GetServerSidePropsContext>context).req !== undefined;
};

export interface Plugin {
  /**
   * Detect whether the plugin contains base data for other plugins, so it will be called at the start
   */
  base: boolean;
  /**
   * A function which will be called during page props generation
   */
  exec(
    props: SitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps>;
}

export class SitecorePagePropsFactory {
  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {GetServerSidePropsContext | GetStaticPropsContext} context
   * @see SitecorePageProps
   */
  public async create(
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps> {
    const extendedProps = await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => +p2.base - +p1.base) // Plugins with the `base = true` should be at the start
      .reduce(async (result, plugin) => {
        const props = await result;
        const newProps = await plugin.exec(props, context);
        return newProps;
      }, Promise.resolve({} as SitecorePageProps));

    return extendedProps;
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
