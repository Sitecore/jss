import { ManifestInstance } from './manifest.types';
import { traverseAllItems, traverseAllRenderings } from './traversal';

function isGuid(value: string) {
  return /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/.test(
    value
  );
}

// Creates a mapping of all the explicitly defined IDs in a manifest file
// Returns an object with maps to all explicitly defined IDs, and all values that reference a given ID
export const createIdMapping = (manifest: ManifestInstance) => {
  const usedIdMap = new Map();
  const referencedIds: any[] = [];

  // function that extracts IDs from a manifest tree
  const mapIds = (item: any, type: string) => {
    if (!item.id) {
      return;
    }

    if (item.name || item.src || item.renderingName) {
      // if a name is set then we're _defining_ an item with an ID
      if (usedIdMap.has(item.id)) {
        throw new Error(
          `The item ID ${
            item.id
          } has been used more than once in an item definition! First usage: ${JSON.stringify(
            usedIdMap.get(item.id)
          )} second usage ${JSON.stringify(item)}`
        );
      }

      usedIdMap.set(item.id, { type, item });
    } else {
      // if a name is NOT set, then we're referencing an item by ID
      referencedIds.push({ id: item.id, reference: item, type });
    }
  };

  // push manifest items into used ID maps
  if (manifest.items && manifest.items.routes) {
    traverseAllItems(manifest.items.routes, mapIds);
    traverseAllRenderings(manifest.items.routes, (rendering) => {
      if (rendering.id && !rendering.componentName) {
        mapIds(rendering, 'rendering');
      }
    });
  }

  if (manifest.items && manifest.items.nonRoutes) {
    traverseAllItems(manifest.items.nonRoutes, mapIds);
  }

  // ensure that all IDs that are referenced are defined
  referencedIds.forEach((reference) => {
    if (!usedIdMap.has(reference.id)) {
      if (isGuid(reference.id)) {
        console.warn(
          `The referenced ID ${
            reference.id
          } was not defined in the manifest. Ensure that this item ID already exists in Sitecore before importing.`
        );
      } else {
        throw new Error(
          `The item ID ${
            reference.id
          } was referred to, but it was not defined! Usage: ${JSON.stringify(reference.reference)}`
        );
      }
    }
  });

  return { ids: usedIdMap, usages: referencedIds };
};
