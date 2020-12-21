// traverses a tree of items on the manifest
// does NOT traverse non-root items (e.g. datasource items, treelist items)
// only root items. `items` is the root of the tree, eg routes or nonRoutes
// callback gets two parameters:
// 1) the item
// 2) the path to the item from the root (including the root name e.g. home/foo; routing would normally have /foo for that)
export const traverseItems = (items: any[], callback: (item: any, currentPath: string) => any) => {
  if (!items) {
    return;
  }

  const traverseInternal = (itemArray: any[], paths: string[]) => {
    itemArray.forEach((item: any) => {
      callback(item, `${paths.join('/')}${paths.length === 0 ? '' : '/'}${item.name}`);
      if (item.children && item.children.length > 0) {
        const newPath = [...paths, item.name];
        traverseInternal(item.children, newPath);
      }
    });
  };

  traverseInternal(items, []);
};

// traverses a tree of items on the manifest
// includes traversal of non-root items (e.g. datasource items, treelist items)
// `items` is the root of the tree, eg routes or nonRoutes
// the callback gets two arguments: the item definition, and the item type
// ('item', 'rendering', or 'datasource')
export function traverseAllItems(items: any[], callback: (item: any, type: string) => any) {
  if (!items || !items.forEach) {
    return;
  }

  function processSingleItem(item: any, type: string) {
    callback(item, type);

    // look over the item's children, if any
    if (item.children && item.children.length > 0) {
      traverseAllItems(item.children, callback);
    }

    // look over items defined in the item's fields
    // (e.g. datasource items)
    if (item.fields) {
      Object.keys(item.fields).forEach((fieldName) => {
        const currentField = item.fields[fieldName];
        const processCandidateFieldValue = (value: any) => {
          if (value.template || value.id) {
            processSingleItem(value, 'item');
          }
        };

        // datasource item
        processCandidateFieldValue(currentField);

        // items defined as part of a treelist/multilist field
        if (Array.isArray(currentField.value)) {
          currentField.value.forEach(processCandidateFieldValue);
        }

        // individual item reference (i.e. droplink, droptree)
        // checking for resolvedFromItemId in case referenced objects were not fully built the first run through
        if (
          currentField.value &&
          (currentField.value.id || currentField.value.resolvedFromItemId)
        ) {
          processCandidateFieldValue(currentField.value);
        }
      });
    }

    // traverse the item's layout/renderings for item definitions
    if (item.layout && item.layout.renderings) {
      item.layout.renderings.forEach((rendering: any) => {
        if (!rendering.dataSource) {
          return;
        }

        processSingleItem(rendering.dataSource, 'datasource');
      });
    }
  }

  items.forEach((item: any) => processSingleItem(item, 'item'));
}

// traverses every field value in an item array, including all children, datasource items, etc
export function traverseAllFields(items: any, callback: (field: any) => any) {
  traverseAllItems(items, (item) => {
    if (!item.fields || !Array.isArray(item.fields)) {
      return;
    }

    item.fields.forEach(callback);
  });
}

// traverses all rendering instance definitions in an item tree
export function traverseAllRenderings(items: any, callback: (rendering: any, item: any) => any) {
  traverseAllItems(items, (item, type) => {
    if (type !== 'item' || !item.layout || !item.layout.renderings) {
      return;
    }

    item.layout.renderings.forEach((rendering: any) => {
      callback(rendering, item);
    });
  });
}
