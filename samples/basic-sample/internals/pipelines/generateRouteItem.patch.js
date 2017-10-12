export const config = (pipelines) => {
  const pipeline = pipelines.getPipeline('generateRouteItem');
  const processor = pipeline.getProcessor('processRenderings');

  console.log('patching "processRenderings" processor');
  // sample code only, doesn't really do anything except illustrate args patching
  const phKeyGen = processor.args.dynamicPlaceholderKeyGenerator;
  processor.args.dynamicPlaceholderKeyGenerator = phKeyGen;
  // processor.args.placeholder.phKey = '/patch';

  pipeline.updateProcessor(processor);
};
