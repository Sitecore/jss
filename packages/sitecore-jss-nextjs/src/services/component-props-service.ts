import { NextPageContext, GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  LayoutServiceData,
  ComponentRendering,
  PlaceholdersData,
} from '@sitecore-jss/sitecore-jss';
import {
  ComponentPropsCollection,
  ComponentPropsFetchFunction,
} from '../sharedTypes/component-props';
import { ComponentModule } from '../sharedTypes/component-module';

export type FetchComponentPropsArguments<NextContext> = {
  layoutData: LayoutServiceData;
  context: NextContext;
  componentModule: ComponentModule;
};

export type ComponentPropsRequest<NextContext> = {
  fetch: ComponentPropsFetchFunction<NextContext>;
  layoutData: LayoutServiceData;
  rendering: ComponentRendering;
  context: NextContext;
};

type FetchFunctionFactory<NextContext> = (
  componentName: string
) => ComponentPropsFetchFunction<NextContext> | undefined;

export class ComponentPropsService {
  /**
   * SSR mode
   * Fetch component props using getServerSideProps function
   */
  async fetchServerSideComponentProps(
    params: FetchComponentPropsArguments<GetServerSidePropsContext>
  ): Promise<ComponentPropsCollection> {
    const { componentModule, layoutData, context } = params;

    const fetchFunctionFactory = (componentName: string) => {
      const module = componentModule(componentName);

      return module?.getServerSideProps;
    };

    return this.fetchComponentProps<GetServerSidePropsContext>(
      fetchFunctionFactory,
      layoutData,
      context
    );
  }

  /**
   * SSG mode
   * Fetch component props using getStaticProps function
   */
  async fetchStaticComponentProps(
    params: FetchComponentPropsArguments<GetStaticPropsContext>
  ): Promise<ComponentPropsCollection> {
    const { componentModule, layoutData, context } = params;

    const fetchFunctionFactory = (componentName: string) => {
      const module = componentModule(componentName);

      return module?.getStaticProps;
    };

    return this.fetchComponentProps<GetStaticPropsContext>(
      fetchFunctionFactory,
      layoutData,
      context
    );
  }

  /**
   * Editing mode
   * Fetch component props using getInitialProps function
   */
  async fetchInitialComponentProps(
    params: FetchComponentPropsArguments<NextPageContext>
  ): Promise<ComponentPropsCollection> {
    const { componentModule, layoutData, context } = params;

    const fetchFunctionFactory = (componentName: string) => {
      const module = componentModule(componentName);

      return module?.getInitialProps;
    };

    return this.fetchComponentProps<NextPageContext>(fetchFunctionFactory, layoutData, context);
  }

  /**
   * Traverse Layout Service data tree and call side effects on component level.
   * Side effect function can be: getStaticProps (SSG) or getServerSideProps (SSR)
   */
  async fetchComponentProps<NextContext>(
    fetchFunctionFactory: FetchFunctionFactory<NextContext>,
    layoutData: LayoutServiceData,
    context: NextContext
  ): Promise<ComponentPropsCollection> {
    // Array of side effect functions
    const requests = this.collectRequests({
      placeholders: layoutData.sitecore.route.placeholders,
      fetchFunctionFactory,
      layoutData,
      context,
    });

    return await this.execRequests(requests);
  }

  /**
   * Go through layout service data, check all renderings using displayName, which should make some side effects.
   * Write result in requests variable
   */
  collectRequests<NextContext>(params: {
    placeholders: PlaceholdersData;
    fetchFunctionFactory: FetchFunctionFactory<NextContext>;
    layoutData: LayoutServiceData;
    context: NextContext;
    requests?: ComponentPropsRequest<NextContext>[];
  }) {
    const { placeholders, fetchFunctionFactory, layoutData, context } = params;

    // Will be called on first round
    if (!params.requests) {
      params.requests = [];
    }

    const renderings = this.flatRenderings(placeholders);

    renderings.map((r) => {
      const fetchFunc = fetchFunctionFactory(r.componentName);

      if (fetchFunc) {
        params.requests &&
          params.requests.push({
            fetch: fetchFunc,
            rendering: r,
            layoutData: layoutData,
            context,
          });
      }

      // If placeholders exist in current rendering
      if (r.placeholders) {
        this.collectRequests({
          ...params,
          placeholders: r.placeholders,
        });
      }
    });

    return params.requests;
  }

  /**
   * Execute request for component props
   */
  async execRequests<NextContext>(requests: ComponentPropsRequest<NextContext>[]) {
    const componentProps: ComponentPropsCollection = {};

    const promises = requests.map((req) => {
      if (!req.rendering.uid) {
        console.log(
          `Component ${req.rendering.componentName} doesn't have uid, can't store data for this component`
        );
        return;
      }

      return req
        .fetch(req.rendering, req.layoutData, req.context)
        .then((result) => {
          // Set component specific data in componentProps store
          componentProps[req.rendering.uid!] = result;
        })
        .catch((error) => {
          console.log(`Error during preload data for component ${req.rendering.uid}:`, error);
          componentProps[req.rendering.uid!] = {
            error,
          };
        });
    });

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
