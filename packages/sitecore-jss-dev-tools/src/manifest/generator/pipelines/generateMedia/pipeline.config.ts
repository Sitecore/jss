import { pipelineFactory, PipelineRegistry } from '@root';

export const config = (pipelines: PipelineRegistry) => {
  const pipeline = pipelineFactory.create('generateMedia');
  pipeline.addProcessor({
    name: 'processRouteItems',
    modulePath: {
      workingDirectory: __dirname,
      filePath: './processRouteItems.js',
    },
  });
  pipeline.addProcessor({
    name: 'processContentItems',
    modulePath: {
      workingDirectory: __dirname,
      filePath: './processContentItems.js',
    },
  });

  pipelines.addPipeline(pipeline);
};
