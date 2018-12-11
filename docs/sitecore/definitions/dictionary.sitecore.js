import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';

// reads dictionary definition file(s) in /data/dictionary, and subfolders if any,
// merges them together, and then emits them into the manifest as { key: 'key', value: 'value' }
// in the manifest language

export default (manifest) => {
  const startPath = './data/dictionary'; // relative to process invocation (i.e. where package.json lives)

  if (!fs.existsSync(startPath)) return;

  // eslint-disable-next-line consistent-return
  return mergeFs(startPath)
    .then((result) => mergeDictionaryFiles({ data: result, language: manifest.language }))
    .then((mergedDictionary) => convertToManifestDictionary(mergedDictionary))
    .then((dictionary) => manifest.addDictionary(dictionary));
};

function convertToManifestDictionary(mergedDictionary) {
  return Object.keys(mergedDictionary).map((key) => ({
    key,
    value: mergedDictionary[key],
    // optional: if you wished to specify the exact ID of a dictionary item when imported,
    // you could pass an 'id' property here that was a GUID or unique (app-wide) string
  }));
}

function mergeDictionaryFiles({ data, language }) {
  let result = {};

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));
  if (file && file.contents) {
    result = file.contents;
  }

  if (data.folders.length > 0) {
    const childResults = data.folders
      .map((folder) => mergeDictionaryFiles({ data: folder, language }))
      .filter((item) => item); // remove null results

    result = Object.assign({}, result, ...childResults);
  }

  return result;
}
