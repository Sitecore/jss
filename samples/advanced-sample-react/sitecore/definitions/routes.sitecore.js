import { addRouteType, addRoute, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

// Collects the disconnected routes defined in data/routes into the manifest.
// This file may be extended if you wish to store disconnected route data in some way other than the default,
// or to preprocess the route data before it is sent to Sitecore to be ingested - for example to add fields to the route type.

const routeTypeName = 'Extended Route';

const convertToRoutes = ({ data, language }) => {
  let result;

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));
  if (file && file.contents) {
    result = file.contents;
    result.template = routeTypeName;
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

export default (manifest) => {
  addRouteType(manifest, {
    name: routeTypeName,
    icon: SitecoreIcon.Megaphone,
    fields: [
      {
        name: 'metaTitle',
        displayName: 'Meta Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'titleText',
        displayName: 'Body Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'body',
        displayName: 'Body Text',
        type: CommonFieldTypes.RichText,
      },
    ],
  });

  return mergeFs('./data/routes') // relative to process invocation (i.e. where you call `npm run manifest:generate`)
    .then((result) => {
      const routeData = convertToRoutes({
        data: result,
        language: manifest.language,
      });
      return routeData;
    })
    .then((routeData) => {
      addRoute(manifest, routeData);
    });
};
