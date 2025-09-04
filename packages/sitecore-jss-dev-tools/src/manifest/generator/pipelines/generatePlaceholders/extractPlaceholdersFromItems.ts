import { GeneratePlaceholdersPipelineArgs } from '../../manifest.types';
import { traverseItems } from '../../traversal';

export default (args: GeneratePlaceholdersPipelineArgs) => {
  const { items } = args;

  const placeholderNames: string[] = [];
  traverseItems(items, (item) => {
    if (item.layout && item.layout.placeholders) {
      placeholderNames.push(...item.layout.placeholders);
    }
  });

  return {
    ...args,
    placeholderNames: [...args.placeholderNames, ...placeholderNames],
  };
};
