import { GenerateRouteItemPipelineArgs } from '../../manifest.types';

const processRenderings = (renderings: any[] = [], routeName: string): any =>
  renderings.reduce((result, rendering) => {
    if (rendering.placeholders) {
      return [...result, ...getPlaceholderNames(rendering.placeholders, routeName)];
    }
    return result;
  }, []);

const getPlaceholderNames = (placeholders: { [k: string]: any } = {}, routeName: string) =>
  Object.keys(placeholders).reduce((result: any[], phName: string) => {
    const placeholder = {
      renderings: placeholders[phName],
      phName,
    };

    if (!placeholder.renderings || !Array.isArray(placeholder.renderings)) {
      // tslint:disable-next-line:no-string-throw max-line-length
      throw `Placeholder '${phName}' on route '${routeName}' contained non-array renderings data. Probably a route data authoring error. (YAML indentation?)`;
    }

    return [...result, phName, ...processRenderings(placeholder.renderings, routeName)];
  }, []);

export default (args: GenerateRouteItemPipelineArgs) => {
  if (!args.route) {
    return args;
  }

  const placeholderNames = getPlaceholderNames(args.route.placeholders, args.route.name);
  return {
    ...args,
    item: {
      ...args.item,
      layout: {
        ...args.item.layout,
        placeholders: placeholderNames,
      },
    },
  };
};
