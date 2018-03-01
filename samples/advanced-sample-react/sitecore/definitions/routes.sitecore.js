import { mergeFs } from "@sitecore-jss/sitecore-jss-dev-tools";

const routeTypeName = "Extended Route";

const convertToRoutes = ({ data, language }) => {
  let result;

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, "i");
  const file = data.files.find(f => match.test(f.filename));
  if (file && file.contents) {
    result = file.contents;
    result.template = routeTypeName;
  } else {
    throw new Error(
      `Route data file not found: ${data.path}\\${language}.(yaml|yml|json)`
    );
  }

  if (result && data.folders.length > 0) {
    result.children = data.folders
      .map(folder => convertToRoutes({ data: folder, language }))
      .filter(route => route); // remove null results
  }

  return result;
};

export default manifest => {
  manifest.addRouteType({
    name: routeTypeName,
    icon: "people/32x32/megaphone.png",
    fields: [
      {
        name: "metaTitle",
        displayName: "Meta Title",
        type: manifest.fieldTypes.singleLineText
      },
      {
        name: "titleText",
        displayName: "Body Title",
        type: manifest.fieldTypes.singleLineText
      },
      {
        name: "body",
        displayName: "Body Text",
        type: manifest.fieldTypes.richText
      }
    ]
  });

  return mergeFs("./data/routes") // relative to process invocation (i.e. where you call `npm run manifest:generate`)
    .then(result => {
      const routeData = convertToRoutes({
        data: result,
        language: manifest.language
      });
      return routeData;
    })
    .then(routeData => {
      manifest.addRoute(routeData);
    });
};
