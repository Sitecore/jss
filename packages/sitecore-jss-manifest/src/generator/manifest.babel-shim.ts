import * as ManifestTypes from './manifest.types';
import { Manifest } from './manifest.types';

// this is a shim to allow non-TypeScript consumers to take advantage of typings data when they cannot specify the
// type of the manifest var in a manifest source file, e.g.
// instead of export default (manifest: Manifest) => { ... }, you can use
// import { addComponent } from 'thislib';
// export default (manifest) => { addComponent(manifest, { data }); }

// DEPRECATED: favor using typing JSDoc instead, e.g. @param {Manifest} manifest Manifest instance to add components to

export function addComponent(
  manifest: Manifest,
  ...components: ManifestTypes.ComponentDefinition[]
) {
  manifest.addComponent(...components);
}

export function addTemplate(manifest: Manifest, ...templates: ManifestTypes.TemplateDefinition[]) {
  manifest.addTemplate(...templates);
}

export function addPlaceholder(
  manifest: Manifest,
  ...placeholders: ManifestTypes.PlaceholderDefinition[]
) {
  manifest.addPlaceholder(...placeholders);
}
export function addRouteType(
  manifest: Manifest,
  ...routeTypes: ManifestTypes.TemplateDefinition[]
) {
  manifest.addRouteType(...routeTypes);
}

export function addRoute(manifest: Manifest, ...routes: ManifestTypes.RouteDefinition[]) {
  manifest.addRoute(...routes);
}

export function addContent(manifest: Manifest, ...contents: ManifestTypes.ItemDefinition[]) {
  manifest.addContent(...contents);
}

export function addDictionary(
  manifest: Manifest,
  ...entries: Array<{ key: string; value: string }>
) {
  manifest.addDictionary(...entries);
}
