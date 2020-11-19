import {
  ComponentRendering,
  LayoutServiceData,
  PlaceholdersData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { componentModule } from 'temp/componentFactory';
import { ComponentPropsFetchFunction } from './component-props';
import { ComponentProps } from './component-props';

type FetchComponentPropsParams<PropsContext> = {
  ssr?: boolean;
  layoutData: LayoutServiceData;
  context?: PropsContext;
};

export class ComponentPropsService {
  /**
   * Traverse Layout Service data tree and call side effects on component level.
   * Side effect function can be: getStaticProps (SSG) or getServerSideProps (SSR)
   */
  async fetchComponentProps<PropsContext>(
    params: FetchComponentPropsParams<PropsContext>
  ): Promise<ComponentProps> {
    const { ssr = false, layoutData, context = {} as PropsContext } = params;

    // Array of side effect functions
    const requests: {
      fetch: ComponentPropsFetchFunction<PropsContext>;
      layoutData: LayoutServiceData | null;
      rendering: ComponentRendering;
      context?: PropsContext;
    }[] = [];

    const componentProps: ComponentProps = {};

    // Go through layout service data, check all renderings using displayName, which should make some side effects.
    const traverseTree = (placeholders: PlaceholdersData) => {
      const renderings = this.flatRenderings(placeholders);

      renderings.map((r) => {
        // get component by name
        const module = componentModule(r.componentName);

        if (!module) {
          return;
        }

        // if SSR -> getServerSideProps, if SSG -> getStaticProps
        const fetchFunc = ssr ? module.getServerSideProps : module.getStaticProps;

        if (fetchFunc) {
          requests.push({ fetch: fetchFunc, rendering: r, layoutData: layoutData, context });
        }

        // If placeholders exist in current rendering
        if (r.placeholders) {
          traverseTree(r.placeholders);
        }
      });
    };

    traverseTree(layoutData.sitecore.route.placeholders);

    const promises = requests.map((req) =>
      req.fetch(req.rendering, req.layoutData, context).then((result) => {
        // Set component specific data in componentProps store
        componentProps[req.rendering.componentName] = result;
      })
    );

    await Promise.all(promises);

    return componentProps;
  }

  /**
   * Take renderings from all placeholders and returns a flat array of renderings.
   * @example
   * const placeholders = {
   *    x1: [{ uid: 1 }, { uid: 2 }],
   *    x2: [{ uid: 11 }, { uid: 22 }]
   * }
   *
   * flatRenderings(placeholders);
   *
   * RESULT: [{ uid: 1 }, { uid: 2 }, { uid: 11 }, { uid: 22 }]
   */
  flatRenderings(placeholders: PlaceholdersData): ComponentRendering[] {
    const allComponentRenderings: ComponentRendering[] = [];
    const placeholdersArr = Object.values(placeholders);

    placeholdersArr.forEach((pl) => {
      const renderings = pl as ComponentRendering[];
      allComponentRenderings.push(...renderings);
    });

    return allComponentRenderings;
  }
}

const componentPropsService = new ComponentPropsService();

export { componentPropsService };
