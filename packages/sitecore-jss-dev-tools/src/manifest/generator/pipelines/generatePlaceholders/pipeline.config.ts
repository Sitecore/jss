import { pipelineFactory, PipelineRegistry } from '@root';
import * as path from 'path';

// __dirname returns the directory of this file/module, so it has to be called here
const resolveModulePath = (modulePath: string) => path.resolve(__dirname, modulePath);

export const config = (pipelines: PipelineRegistry) => {
  const pipeline = pipelineFactory.create('generatePlaceholders');

  pipeline.addProcessor({
    name: 'extractPlaceholdersFromItems',
    modulePath: resolveModulePath('./extractPlaceholdersFromItems.js'),
  });
  pipeline.addProcessor({
    name: 'extractPlaceholdersFromRenderings',
    modulePath: resolveModulePath('./extractPlaceholdersFromRenderings.js'),
  });
  pipeline.addProcessor({
    name: 'removeDuplicates',
    modulePath: resolveModulePath('./removeDuplicates.js'),
  });
  pipeline.addProcessor({
    name: 'mergePlaceholders',
    modulePath: resolveModulePath('./mergePlaceholders.js'),
  });
  pipeline.addProcessor({
    name: 'checkBlacklistedKeys',
    modulePath: resolveModulePath('./checkBlacklistedKeys.js'),
  });

  pipelines.addPipeline(pipeline);
};
