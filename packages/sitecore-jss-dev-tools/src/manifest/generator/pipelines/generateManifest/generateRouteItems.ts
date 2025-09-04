import { ExecutablePipeline, runPipeline } from './../../../../index';
import {
  ComponentDefinition,
  GeneratePipelineArgs,
  GenerateRouteItemPipelineArgs,
  RouteDefinition,
} from '../../manifest.types';

const generateRouteItems = async (
  routes: RouteDefinition[],
  components: ComponentDefinition[],
  pipelines: { [key: string]: ExecutablePipeline }
) => {
  const result: any[] = [];
  const pipeline = { ...pipelines.generateRouteItem };

  const pipelineArgs: GenerateRouteItemPipelineArgs = {
    ...pipeline.args,
    components,
    pipelines,
  };

  pipeline.args = pipelineArgs;

  for (const route of routes) {
    pipeline.args.route = route;
    // eslint-disable-next-line no-await-in-loop
    const pipelineResult = await runPipeline(pipeline);
    result.push(pipelineResult.item);
  }
  return result;
};

export default async (args: GeneratePipelineArgs) => {
  const { routes, components, pipelines } = args;

  const routeItems = await generateRouteItems(routes, components, pipelines);

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      items: {
        ...args.pipelineResult.items,
        routes: [...args.pipelineResult.items.routes, ...routeItems],
      },
    },
  };
};
