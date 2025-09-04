import * as path from 'path';
import { pipelineFactory } from '../../../pipelineFactory';

const resolveModulePath = (modulePath: string) => {
  return path.resolve(__dirname, modulePath);
};

export const config = (pipelines: any) => {
  const pipeline = pipelineFactory.create('pipeline1');

  pipeline.addProcessor({
    name: 'proc0',
    modulePath: resolveModulePath('./proc0.js'),
    args: {
      fileArg0: 'fileArg0',
    },
  });

  pipelines.addPipeline(pipeline);
};
