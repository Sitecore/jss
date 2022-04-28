import { GeneratePlaceholdersPipelineArgs } from '../../manifest.types';

export default (args: GeneratePlaceholdersPipelineArgs) => {
  const { placeholderNames } = args;

  const result = placeholderNames
    // for any placeholders of form '/key1/key2/etc...', extract the last segment of the key
    .map((phKey: string) => {
      if (phKey.indexOf('/') !== -1) {
        return phKey.substring(phKey.lastIndexOf('/') + 1);
      }
      return phKey;
    })
    // http://stackoverflow.com/a/14438954/9324
    // filter out duplicate values
    .filter((phKey: string, index: number, arr: string[]) => arr.indexOf(phKey) === index);

  return {
    ...args,
    placeholderNames: result,
  };
};
