import { GenerateRouteItemPipelineArgs } from '../../manifest.types';
import { convertComponentDataToFields } from '../../utils';

export default (args: GenerateRouteItemPipelineArgs) => {
  if (!args.route) {
    return args;
  }

  const item: any = Object.assign({}, args.route);

  delete item.children;
  delete item.path;
  delete item.placeholders;
  delete item.fields;

  item.layout = {
    renderings: [],
    placeholders: [],
  };

  if (args.route.fields) {
    item.fields = convertComponentDataToFields({ data: args.route.fields, context: { item } });
  }

  return { ...args, item };
};
