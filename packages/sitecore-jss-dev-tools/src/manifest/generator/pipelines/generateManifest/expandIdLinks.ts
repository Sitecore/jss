import { GeneratePipelineArgs } from '../../manifest.types';
import { traverseAllFields, traverseItems } from '../../traversal';

// expands link fields with 'jss://other-item-id' link values into links to those other items

export default (args: GeneratePipelineArgs) => {
  const { pipelineResult: manifest } = args;

  const handleField = (field: any) => {
    if (field.value && field.value.href && field.value.href.startsWith('jss://')) {
      const id = field.value.href.substring(6);

      let path = '';

      traverseItems(manifest.items.routes, (item: any, currentPath: any) => {
        if (!item.id || item.id !== id) {
          return;
        }

        path = currentPath;
      });

      if (!path) {
        throw new Error(`The link ${field.value.href} pointed to a nonexistant route ID.`);
      }

      // the path value is a root relative including the root, e.g. home/foo
      // for a link, we want the route path which would not include the 'home' piece so we strip it
      // for a root link, there's no / so we just sub that in

      // eslint-disable-next-line no-param-reassign
      field.value.href = path.indexOf('/') >= 0 ? path.substring(path.indexOf('/')) : '/';
    }
  };

  traverseAllFields(manifest.items.routes, handleField);
  traverseAllFields(manifest.items.nonRoutes, handleField);

  return args;
};
