import * as path from 'path';
import { pipelineFactory } from '../../../pipelineFactory';

// __dirname returns the directory of this file/module
const resolveModulePath = (modulePath: string) => {
  return path.resolve(__dirname, modulePath);
};

const pipeline = pipelineFactory.create('pipeline0');

pipeline.addProcessor({
  name: 'proc0',
  modulePath: {
    workingDirectory: __dirname,
    filePath: './proc0.js',
  },
  args: {
    fileArg0: 'fileArg0',
  },
});

pipeline.addProcessor({
  name: 'proc1',
  modulePath: resolveModulePath('./proc1.js'),
});

pipeline.addProcessor({
  name: 'proc2',
  modulePath: resolveModulePath('./proc2.js'),
});

export const config = (pipelines: any) => {
  pipelines.addPipeline(pipeline);
};
