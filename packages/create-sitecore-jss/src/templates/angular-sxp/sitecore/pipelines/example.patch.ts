export const config = (pipelines: {
  getPipeline: (
    pipelineName: string
  ) => { addProcessor: (processor: { name: string; process: (args: unknown) => unknown }) => void };
}) => {
  const pipeline = pipelines.getPipeline('generateManifest');
  pipeline.addProcessor({
    name: 'hello-world',
    process: function(args) {
      console.log('Hello manifest pipeline extension!');
      return args;
    },
  });
};
