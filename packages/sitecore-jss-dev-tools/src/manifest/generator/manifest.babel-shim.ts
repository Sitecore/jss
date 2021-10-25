import * as ManifestTypes from './manifest.types';
import { Manifest } from './manifest.types';

// this is a shim to allow non-TypeScript consumers to take advantage of typings data when they cannot specify the
// type of the manifest var in a manifest source file, e.g.
// instead of export default (manifest: Manifest) => { ... }, you can use
// import { addComponent } from 'thislib';
// export default (manifest) => { addComponent(manifest, { data }); }

// DEPRECATED: favor using typing JSDoc instead, e.g. @param {Manifest} manifest Manifest instance to add components to

/**
 * @param {Manifest} manifest
 * @param {...any} components
 */
export function addComponent(
  manifest: Manifest,
  ...components: ManifestTypes.ComponentDefinition[]
) {
  manifest.addComponent(...components);
}

/**
 * @param {Manifest} manifest
 * @param {...any} templates
 */
export function addTemplate(manifest: Manifest, ...templates: ManifestTypes.TemplateDefinition[]) {
  manifest.addTemplate(...templates);
}

/**
 * @param {Manifest} manifest
 * @param {...any} placeholders
 */
export function addPlaceholder(
  manifest: Manifest,
  ...placeholders: ManifestTypes.PlaceholderDefinition[]
) {
  manifest.addPlaceholder(...placeholders);
}
/**
 * @param {Manifest} manifest
 * @param {...any} routeTypes
 */
export function addRouteType(
  manifest: Manifest,
  ...routeTypes: ManifestTypes.TemplateDefinition[]
) {
  manifest.addRouteType(...routeTypes);
}

/**
 * @param {Manifest} manifest
 * @param {...any} routes
 */
export function addRoute(manifest: Manifest, ...routes: ManifestTypes.RouteDefinition[]) {
  manifest.addRoute(...routes);
}

/**
 * @param {Manifest} manifest
 * @param {...any} contents
 */
export function addContent(manifest: Manifest, ...contents: ManifestTypes.ItemDefinition[]) {
  manifest.addContent(...contents);
}

/**
 * @param {Manifest} manifest
 * @param {...any} entries
 */
export function addDictionary(
  manifest: Manifest,
  ...entries: Array<{ key: string; value: string }>
) {
  manifest.addDictionary(...entries);
}
