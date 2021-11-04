import { configLoader } from './configLoader';
import { run } from './pipeline';
import { pipelineFactory } from './pipelineFactory';
import { initCompilers } from './utils';

const pipeline = pipelineFactory.create('Sample Pipeline');
pipeline.args.pipelineArg0 = 'pipelineArg0';
pipeline.addProcessor({
  name: 'proc0',
  modulePath: './test/pipelines/pipeline0/proc0.js',
  args: {
    fileArg0: 'fileArg0',
  },
});

pipeline
  .runWithCompilers(['babel-core/register'])
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error(err);
  });

const runner = async () => {
  const compilers = ['babel-core/register'];
  return initCompilers(compilers)
    .then(() =>
      configLoader({ fileGlobs: ['../test/pipelines/**/*.config.js'], workingDirectory: __dirname })
    )
    .then((config: any) =>
      configLoader({
        fileGlobs: ['../test/patch/**/*.config.js'],
        workingDirectory: __dirname,
        existingConfig: config,
      })
    )
    .then((config: any) => {
      const pipeline0 = config.pipeline0;
      pipeline0.args.arg0 = 'testArg';
      return run(pipeline0);
    });
};

runner()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .then(() => pipeline.run())
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error(err);
  });
