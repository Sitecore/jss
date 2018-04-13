import { Manifest, CommonFieldTypes, RouteDefinition, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';
import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

const routeTypeName = 'Extended Route';

const convertToRoutes = ({ data, language }) => {
  let result: RouteDefinition;

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

export default (manifest: Manifest) => {
  manifest.addRouteType({
    name: routeTypeName,
    icon: SitecoreIcon.Megaphone,
    fields: [
      { name: 'metaTitle', displayName: 'Meta Title', type: CommonFieldTypes.SingleLineText },
      { name: 'titleText', displayName: 'Body Title', type: CommonFieldTypes.SingleLineText },
      { name: 'body', displayName: 'Body Text', type: CommonFieldTypes.RichText }
    ]
  });

  return mergeFs('./data/routes') // relative to process invocation (i.e. where you call `npm run manifest:generate`)
    .then((result) => {
      return convertToRoutes({ data: result, language: manifest.language });
    })
    .then((routeData: RouteDefinition) => {
      manifest.addRoute(routeData);
    });
};
