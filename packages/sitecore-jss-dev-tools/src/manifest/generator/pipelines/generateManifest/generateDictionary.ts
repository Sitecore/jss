import { GeneratePipelineArgs } from '../../manifest.types';

export default (args: GeneratePipelineArgs) => {
  const { dictionary } = args;

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      dictionary,
    },
  };
};
