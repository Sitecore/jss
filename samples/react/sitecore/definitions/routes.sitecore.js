/* eslint-disable no-unused-vars */
import path from 'path';
import { Manifest, RouteDefinition, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';
import { mergeFs, MergeFsResult } from '@sitecore-jss/sitecore-jss-dev-tools';

/* eslint-enable no-unused-vars */

/**
 * Collects the disconnected routes defined in data/routes into the manifest.
 * Invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * Alter this method if you wish to store disconnected route data in some way other than the default,
 * or to preprocess the route data before it is sent to Sitecore to be ingested - for example to add fields to the route type.
 * @param {Manifest} manifest The manifest instance to add routes to
 * @returns {Promise}
 */
export default function addRoutesToManifest(manifest) {
  // Configure the default route type for the app
  // this lets us enable route-level data fields,
  // which most apps will want for metadata like page titles, SEO metas, or OpenGraph.
  // You can add additional non-default route types using `manifest.addRouteType()`,
  // which routes can use by setting `template: YourCustomRouteTypeName` in their definition.
  const appTemplateSection = 'Page Metadata';

  manifest.setDefaultRouteType({
    name: 'App Route',
    fields: [
      {
        name: 'pageTitle',
        displayName: 'Page Title',
        section: appTemplateSection,
        type: CommonFieldTypes.SingleLineText,
      },
    ],
    insertOptions: ['App Route'],
  });

  return mergeFs('./data/routes') // relative to process invocation (i.e. your package.json)
    .then((result) => convertToRoutes(result, manifest.language))
    .then((routeData) => {
      manifest.addRoute(routeData);
    });
}

/**
 * Maps filesystem data into manifest route data.
 * This is where custom conventions regarding route data would go.
 * @param {MergeFsResult} data Filesystem data (files and folders under current path)
 * @param {string} language Language the manifest is being created in. Conventionally affects the expected filename.
 * @returns {RouteDefinition}
 */
function convertToRoutes(data, language) {
  let routeData;

  // regex that matches the expected route file name
  const routeFilePattern = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');

  // find the expected file in the list of files in the current folder
  const routeFileData = data.files.find((f) => routeFilePattern.test(f.filename));

  // parse the route data file contents
  if (routeFileData && routeFileData.contents) {
    routeData = routeFileData.contents;

    if (!routeData.name) {
      // no name = imply one from parent folder name
      routeData.name = path.basename(path.dirname(routeFileData.path));
      // special case for the home route item as its parent folder is 'routes'
      if (routeData.name === 'routes') routeData.name = 'home';
    }
  } else {
    console.warn(
      `Route data file not found: ${data.path}\\${language}.(yaml|yml|json).
The route will not be added to the manifest. Empty folders can cause this warning.`
    );
  }

  // recursively crawl child routes (folders)
  if (routeData && data.folders.length > 0) {
    routeData.children = data.folders
      .map((folder) => convertToRoutes(folder, language))
      .filter((route) => route); // remove null results
  }

  return routeData;
}
