import { ExecutablePipeline, runPipeline } from '@sitecore-jss/sitecore-pipelines';
import {
  ComponentDefinition,
  GenerateContentItemArgs,
  GeneratePipelineArgs,
  ItemDefinition,
  TemplateDefinition,
} from '../../manifest.types';

const generateContentItems = async (
  contentData: ItemDefinition[],
  templates: TemplateDefinition[],
  components: ComponentDefinition[],
  pipelines: { [key: string]: ExecutablePipeline }
) => {
  const result: any[] = [];
  const pipeline = { ...pipelines.generateContentItem };
  const pipelineArgs: GenerateContentItemArgs = {
    ...pipeline.args,
    templates,
    components,
    pipelines,
  };

  for (const content of contentData) {
    (pipelineArgs as any).content = content;

    pipeline.args = pipelineArgs;

    // eslint-disable-next-line no-await-in-loop
    const pipelineResult = await runPipeline(pipeline);

    result.push(pipelineResult.item);
  }

  return result;
};

export default async (args: GeneratePipelineArgs) => {
  const { content, pipelines, components, templates } = args;

  const contentItems = await generateContentItems(content, templates, components,  pipelines);
  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      items: {
        ...args.pipelineResult.items,
        nonRoutes: [...args.pipelineResult.items.nonRoutes, ...contentItems],
      },
    },
  };
};
