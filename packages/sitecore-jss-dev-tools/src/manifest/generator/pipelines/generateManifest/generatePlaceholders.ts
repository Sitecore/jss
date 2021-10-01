import { runPipeline } from '../../../../index';
import { GeneratePipelineArgs, GeneratePlaceholdersPipelineArgs } from '../../manifest.types';

const generatePlaceholders = async ({
  items,
  renderings,
  placeholders,
  pipelines,
  rootPlaceholders,
  skipPlaceholderBlacklist,
}: any) => {
  const pipeline = { ...pipelines.generatePlaceholders };

  const pipelineArgs: GeneratePlaceholdersPipelineArgs = {
    ...pipeline.args,
    items: items.routes,
    renderings,
    placeholders,
    placeholderNames: [],
    rootPlaceholders,
    pipelines,
    skipPlaceholderBlacklist,
  };

  pipeline.args = pipelineArgs;

  const pipelineResult = await runPipeline(pipeline);

  return pipelineResult.placeholders;
};

export default async (args: GeneratePipelineArgs) => {
  const { items, renderings } = args.pipelineResult;

  const placeholders = await generatePlaceholders({
    items,
    renderings,
    rootPlaceholders: args.pipelineResult.rootPlaceholders,
    ...args,
  });

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      placeholders,
    },
  };
};
