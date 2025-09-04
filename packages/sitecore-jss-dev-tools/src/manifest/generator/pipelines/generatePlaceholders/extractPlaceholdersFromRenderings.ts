import { GeneratePlaceholdersPipelineArgs } from '../../manifest.types';

export default (args: GeneratePlaceholdersPipelineArgs) => {
  const { renderings } = args;

  const placeholderNames = renderings.reduce((result: any, rendering: any) => {
    if (rendering.exposedPlaceholders && Array.isArray(rendering.exposedPlaceholders)) {
      return [...result, ...rendering.exposedPlaceholders];
    }
    return result;
  }, []);

  return {
    ...args,
    placeholderNames: [...args.placeholderNames, ...placeholderNames],
  };
};
