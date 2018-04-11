import { addRoute } from '@sitecore-jss/sitecore-jss-manifest';
import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';

// Collects the disconnected routes defined in data/routes into the manifest.
// This file may be extended if you wish to store disconnected route data in some way other than the default,
// or to preprocess the route data before it is sent to Sitecore to be ingested - for example to add fields to the route type.

const ensureLeadingCharacter = (val, char = '/') => {
  if (!val) {
    return char;
  }
  return val.indexOf(char) > 0 ? `${char}${val}` : val;
};

export default function(manifest) {
  // we are mocking the install path of the app since it's not the same as site root in this case
  return mergeFs('./data/routes/EmbeddedWizard/Wizard') // relative to process invocation (i.e. your package.json)
    .then((result) => convertToRoutes({ data: result, language: manifest.language }))
    .then((routeData) => {
      addRoute(manifest, routeData);
    });
}

function convertToRoutes({ data, language, basePath }) {
  const itemPath = ensureLeadingCharacter(data.path.replace(basePath, '').replace(/\\/g, '/'), '/');
  const name = itemPath.substr(itemPath.lastIndexOf('/') + 1);

  let result;

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));
  if (file && file.contents) {
    // optional, for custom template: result.template = "Name Of Route Type Registered";
    result = file.contents;
  } else {
    // assume it's a folder if we don't find an item file
    result = {
      path: itemPath,
      name,
      displayName: name,
      template: 'Folder',
      children: [],
    };
  }

  if (result && data.folders.length > 0) {
    result.children = data.folders
      .map((folder) => convertToRoutes({ data: folder, language }))
      .filter((route) => route); // remove null results
  }

  return result;
}
