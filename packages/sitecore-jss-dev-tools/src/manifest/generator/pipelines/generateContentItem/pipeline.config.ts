import { pipelineFactory, PipelineRegistry } from '../../../../index';
import * as path from 'path';

// __dirname returns the directory of this file/module, so it has to be called here
const resolveModulePath = (modulePath: string) => path.resolve(__dirname, modulePath);

export const config = (pipelines: PipelineRegistry) => {
  const pipeline = pipelineFactory.create('generateContentItem');

  pipeline.addProcessor({
    name: 'generateItem',
    modulePath: resolveModulePath('./generateItem.js'),
  });

  pipeline.addProcessor({
    name: 'processNestedContent',
    modulePath: resolveModulePath('./processNestedContent.js'),
  });

  pipelines.addPipeline(pipeline);
};
