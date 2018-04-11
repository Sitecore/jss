import { Manifest, RouteDefinition } from '@sitecore-jss/sitecore-jss-manifest';
import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

const convertToRoutes = ({ data, language }) => {
  let result: RouteDefinition;

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));
  if (file && file.contents) {
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

export default (manifest: Manifest) => {
  return mergeFs('./data/routes') // relative to process invocation (i.e. where you call `npm run manifest:generate`)
    .then((result) => {
      return convertToRoutes({ data: result, language: manifest.language });
    })
    .then((routeData: RouteDefinition) => {
      manifest.addRoute(routeData);
    });
};
