export const config = (pipelines: any) => {
  const pipeline0 = pipelines.getPipeline('pipeline0');
  pipeline0.args.patchedPipelineArg = 'patchedPipelineArg';
  pipelines.updatePipeline(pipeline0);

  const proc1 = pipeline0.getProcessor('proc1');
  proc1.args = {
    myArg: 'myArg0-patched',
  };
  pipeline0.updateProcessor(proc1);
};
