import { GeneratePlaceholdersPipelineArgs, PlaceholderDefinition } from '../../manifest.types';

export default (args: GeneratePlaceholdersPipelineArgs) => {
  const { placeholders, placeholderNames, rootPlaceholders } = args;

  const knownPlaceholderNames = placeholderNames.concat(rootPlaceholders);

  const finalPlaceholders: PlaceholderDefinition[] = [...placeholders];
  knownPlaceholderNames.forEach((name) => {
    if (!finalPlaceholders.find((existing) => existing.name === name)) {
      finalPlaceholders.push({ name });
    }
  });

  return {
    ...args,
    placeholders: finalPlaceholders,
  };
};
