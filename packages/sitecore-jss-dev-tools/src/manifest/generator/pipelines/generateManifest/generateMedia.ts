import { runPipeline } from '@root';
import { GeneratePipelineArgs } from '../../manifest.types';

const generateMedia = async ({ items, templates, pipelines }: any) => {
  const pipeline = { ...pipelines.generateMedia };
  pipeline.args = {
    ...pipeline.args,
    routes: items.routes,
    content: items.nonRoutes,
    templates,
    pipelines,
  };
  const pipelineResult = await runPipeline(pipeline);
  return pipelineResult.media;
};

export default async (args: GeneratePipelineArgs) => {
  const { items, templates } = args.pipelineResult;

  const media = await generateMedia({ items, templates, pipelines: args.pipelines });

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      media: [...(args.pipelineResult.media as any[]), ...media],
    },
  };
};
