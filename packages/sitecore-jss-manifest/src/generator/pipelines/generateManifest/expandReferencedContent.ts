import { createIdMapping } from '../../createIdMapping';
import { GeneratePipelineArgs, ManifestInstance } from '../../manifest.types';
import { traverseAllItems } from '../../traversal';

// expands content or renderings referenced by ID in the manifest source
// into the manifest. Only items with 'copy:true' are normally fully expanded.
// If manifesting for disconnected mode, we expand everything to provide a complete datasource.

function expandReferencedContent(manifest: ManifestInstance) {
  // because of transitive references we may need to make multiple expand passes
  let expandedItems = false;

  const idMap = createIdMapping(manifest);

  // we expand copy: true ID references to be a copy of the original
  idMap.usages.reverse().forEach((idReference) => {
    expandedItems = true;

    const source = idMap.ids.get(idReference.id);
    const sourceType = source.type;
    const targetType = idReference.type;

    const refDeepClone = JSON.parse(JSON.stringify(source.item));
    const expandedRef = Object.assign({ resolvedFromItemId: idReference.id }, refDeepClone);

    // we clear the `id` off any children of the expanded reference because this would result
    // in a duplicate ID definition. There are two possible cases here:
    // (a) an ID reference, in which case removing the ID will not affect the original referenced child ID
    // (b) an ID with copy reference, in which case the copy would legitimately always be a duplicate ID unless we unset it
    traverseAllItems(refDeepClone.children, (item) => {
      delete item.id;
    });

    if (targetType === 'rendering') {
      expandedRef.dataSource = expandedRef.dataSource || {};

      // change 'template' (for items) to 'renderingName' (for renderings)
      if (expandedRef.template) {
        expandedRef.renderingName = expandedRef.template;

        // we do want 'template' under dataSource, though
        expandedRef.dataSource.template = expandedRef.template;

        delete expandedRef.template;
      }

      // move any children down to the dataSource definition
      if (expandedRef.children) {
        expandedRef.dataSource.children = expandedRef.children;
        delete expandedRef.children;
      }

      // if we reference a rendering ID from another rendering, we need to prevent
      // the UID value from the referenced rendering from copying over the UID
      // that the reference was already assigned - which could create duplicate UIDs
      // on rendering instances - which is bad.
      if (idReference.reference.uid) {
        expandedRef.uid = idReference.reference.uid;
      }

      // if we're copying, preserve the name generated for the id reference
      if (
        idReference.reference.copy &&
        idReference.reference.dataSource &&
        idReference.reference.dataSource.name
      ) {
        expandedRef.dataSource.name = idReference.reference.dataSource.name.replace(
          'undefined', // hack around default datasource namer using the componentName, which isn't defined when its an ID reference
          expandedRef.dataSource.template
        );
      }

      // if we're copying, preserve the display name generated for the id reference
      if (
        idReference.reference.copy &&
        idReference.reference.dataSource &&
        idReference.reference.dataSource.displayName
      ) {
        expandedRef.dataSource.displayName = idReference.reference.dataSource.displayName.replace(
          'undefined', // hack around default datasource namer using the componentName, which isn't defined when its an ID reference
          expandedRef.dataSource.template
        );
      }
    }

    if (sourceType !== 'rendering' && targetType === 'rendering') {
      // renderings in manifest store fields under the 'dataSource' property
      if (expandedRef.fields) {
        expandedRef.dataSource.fields = expandedRef.fields;
        delete expandedRef.fields;
      }

      // tweak rendering parameters if defined
      if (expandedRef.params) {
        const initialArray: any[] = [];

        // if defined the params will be { param: value }, but manifest needs { name: param, value: value }
        expandedRef.renderingParams = Object.keys(expandedRef.params).reduce((result, current) => {
          const newResult = result;
          newResult.push({ name: current, value: expandedRef.params[current] });
          return newResult;
        }, initialArray);

        delete expandedRef.params;
      }

      // move 'name' under 'dataSource' if defined, unless copying (needs unique name then)
      if (expandedRef.name && !idReference.reference.copy) {
        expandedRef.dataSource.name = expandedRef.name;
        delete expandedRef.name;
      }

      // move 'displayName' under 'dataSource' if defined, unless copying
      if (expandedRef.displayName && !idReference.reference.copy) {
        expandedRef.dataSource.displayName = expandedRef.displayName;
        delete expandedRef.displayName;
      }
    } else {
      delete expandedRef.params;
    }

    // we take advantage of objects by reference here to directly inject into the manifest
    // the copied values (id.reference is a part of the manifest object)
    Object.assign(idReference.reference, expandedRef);

    // note that we need to remove the ID from the copy/reference - or else we'd get duplicate IDs
    // eslint-disable-next-line no-param-reassign
    delete idReference.reference.id;
  });

  // if we expanded any items this run, we re-run the expansion on the new manifest
  // this allows us to follow transitive references (e.g. 'A' refs 'B', but 'B' refs 'C';
  // the copy of 'C' in 'A' will need a second pass depending on the order of expansion)
  if (expandedItems) {
    expandReferencedContent(manifest);
  }
}

export default (args: GeneratePipelineArgs) => {
  const { pipelineResult: manifest } = args;

  expandReferencedContent(manifest);

  return args;
};
