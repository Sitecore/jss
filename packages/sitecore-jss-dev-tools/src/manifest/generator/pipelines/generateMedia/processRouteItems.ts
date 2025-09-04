import { traverseItems } from '../../traversal';
import { buildMediaOutput, enhanceTemplates } from './utils';

export default (args: any) => {
  const { routes } = args;

  const templates = enhanceTemplates(args.templates);
  const media = args.media ? [...args.media] : [];
  traverseItems(routes, (item: any) => {
    const routeMedia = buildMediaOutput(item, templates);
    media.push(...routeMedia);
    if (item.layout && item.layout.renderings) {
      item.layout.renderings.forEach((rendering: any) => {
        const dataSourceMedia = buildMediaOutput(rendering.dataSource, templates);
        media.push(...dataSourceMedia);
      });
    }
  });

  return {
    ...args,
    media,
  };
};
