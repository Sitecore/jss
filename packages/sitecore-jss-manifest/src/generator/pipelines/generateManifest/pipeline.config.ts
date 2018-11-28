import { pipelineFactory, PipelineRegistry } from '@sitecore-jss/sitecore-pipelines';
import * as path from 'path';

// __dirname returns the directory of this file/module, so it has to be called here
const resolveModulePath = (modulePath: string) => path.resolve(__dirname, modulePath);

export const config = (pipelines: PipelineRegistry) => {
  const pipeline = pipelineFactory.create('generateManifest');

  pipeline.addProcessor({
    name: 'generateTemplates',
    modulePath: resolveModulePath('./generateTemplates.js'),
  });
  pipeline.addProcessor({
    name: 'generateRouteItems',
    modulePath: resolveModulePath('./generateRouteItems.js'),
  });
  pipeline.addProcessor({
    name: 'generateContentItems',
    modulePath: resolveModulePath('./generateContentItems.js'),
  });
  pipeline.addProcessor({
    name: 'generateDictionary',
    modulePath: resolveModulePath('./generateDictionary.js'),
  });
  pipeline.addProcessor({
    name: 'generateRenderings',
    modulePath: resolveModulePath('./generateRenderings.js'),
  });
  pipeline.addProcessor({
    name: 'generatePlaceholders',
    modulePath: resolveModulePath('./generatePlaceholders.js'),
  });
  pipeline.addProcessor({
    name: 'generateMedia',
    modulePath: resolveModulePath('./generateMedia.js'),
  });
  pipeline.addProcessor({
    name: 'expandReferencedContent',
    modulePath: resolveModulePath('./expandReferencedContent.js'),
  });
  pipeline.addProcessor({
    name: 'expandIdLinks',
    modulePath: resolveModulePath('./expandIdLinks.js'),
  });
  pipeline.addProcessor({
    name: 'cleanupRenderingDatasources',
    modulePath: resolveModulePath('./cleanupRenderingDatasources.js'),
  });

  pipelines.addPipeline(pipeline);
};
