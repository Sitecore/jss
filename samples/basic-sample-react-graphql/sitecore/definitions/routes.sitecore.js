import { addRoute } from '@sitecore-jss/sitecore-jss-manifest';

import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

// Collects the disconnected routes defined in data/routes into the manifest.
// This file may be extended if you wish to store disconnected route data in some way other than the default,
// or to preprocess the route data before it is sent to Sitecore to be ingested - for example to add fields to the route type.

export default function(manifest) {
  /*
  optional: to add a custom route type with fields
  manifest.addRouteType({
    name: "My Special Route Type",
    fields: [
      { name: 'metaTitle', displayName: 'Meta Title', type: manifest.fieldTypes.singleLineText }
    ]
  });
  then, set `result.template = "My Special Route Type"` in convertToRoutes() below
  */
  return mergeFs('./data/routes') // relative to process invocation (i.e. your package.json)
    .then((result) => convertToRoutes({ data: result, language: manifest.language }))
    .then((routeData) => {
      addRoute(manifest, routeData);
    });
}

const convertToRoutes = ({ data, language }) => {
  let result;

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));
  if (file && file.contents) {
    // optional, for custom template: result.template = "Name Of Route Type Registered";
    result = file.contents;
  } else {
    throw new Error(`Route data file not found: ${data.path}\\${language}.(yaml|yml|json)`);
  }

  if (result && data.folders.length > 0) {
    result.children = data.folders
      .map((folder) => convertToRoutes({ data: folder, language }))
      .filter((route) => route); // remove null results
  }

  return result;
};
