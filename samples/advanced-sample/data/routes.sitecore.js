import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

const routeTypeName = 'Extended Route';

const convertToRoutes = ({ data, language }) => {
  let result;

  const filename = `${language}.json`.toUpperCase();
  const file = data.files.find(f => f.filename.toUpperCase() === filename);
  if (file && file.contents) {
    result = file.contents;
    result.template = routeTypeName;
  } else {
    console.warn(`route data file not found: ${filename}`, data.path);
  }

  if (result && data.folders.length > 0) {
    result.children = data.folders
      .map(folder => convertToRoutes({ data: folder, language }))
      .filter(route => route); // remove null results
  }

  return result;
};

export default (manifest) => {
  manifest.addRouteType({
    name: routeTypeName,
    fields: [
      { name: 'metaTitle', displayName: 'Meta Title', type: manifest.fieldTypes.singleLineText },
      { name: 'titleText', displayName: 'Body Title', type: manifest.fieldTypes.singleLineText },
      { name: 'body', displayName: 'Body Text', type: manifest.fieldTypes.richText }
    ]
  });

  return mergeFs('./data/routes') // relative to process invocation (i.e. where you call `npm run manifest:generate`)
    .then((result) => {
      const routeData = convertToRoutes({ data: result, language: manifest.language });
      return routeData;
    })
    .then((routeData) => {
      manifest.addRoute(routeData);
    });
};
