import { runPipeline } from '@sitecore-jss/sitecore-pipelines';
import { GenerateRouteItemPipelineArgs } from '../../manifest.types';

export default async (args: GenerateRouteItemPipelineArgs) => {
  if (!args.route || !args.pipelines) {
    return args;
  }

  const { route, pipelines } = args;

  if (route.children && route.children.length > 0) {
    const pipeline = pipelines.generateRouteItem;
    pipeline.args = {
      ...pipeline.args,
      ...args,
    };
    const promises = route.children.map(async (childRoute: any) => {
      pipeline.args.route = childRoute;
      return runPipeline(pipeline);
    });

    const results = await Promise.all(promises);
    return {
      ...args,
      item: {
        ...args.item,
        children: results.map((result: any) => result.item),
      },
    };
  }

  return args;
};
