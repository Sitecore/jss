import { traverseItems } from '../../traversal';
import { buildMediaOutput, enhanceTemplates } from './utils';

export default (args: any) => {
  const { content } = args;

  const templates = enhanceTemplates(args.templates);
  const media = args.media ? [...args.media] : [];
  traverseItems(content, (item) => {
    const mediaOutput = buildMediaOutput(item, templates);
    media.push(...mediaOutput);
  });

  return {
    ...args,
    media,
  };
};
