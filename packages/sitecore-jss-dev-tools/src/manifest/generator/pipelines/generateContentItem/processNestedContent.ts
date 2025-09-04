import { runPipeline } from './../../../../index';
import { GenerateContentItemArgs, ItemDefinition } from '../../manifest.types';

export default async (args: GenerateContentItemArgs) => {
  const { content, pipelines } = args;

  const actualContent = (content as any) as ItemDefinition;
  if (actualContent.children && actualContent.children.length > 0) {
    const pipeline = { ...pipelines.generateContentItem };
    const pipelineArgs: GenerateContentItemArgs = {
      ...pipeline.args,
      ...args,
    };

    const promises = actualContent.children.map(async (nestedContent: any) => {
      pipelineArgs.content = nestedContent;

      pipeline.args = pipelineArgs;
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
