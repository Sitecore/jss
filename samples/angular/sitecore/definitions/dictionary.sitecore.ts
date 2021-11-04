import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';
import { mergeFs, MergeFsResult } from '@sitecore-jss/sitecore-jss-dev-tools';
import { existsSync as fileExistsSync } from 'fs';

/**
 * Reads dictionary definition file in /data/dictionary,
 * then emits the dictionary into the disconnected manifest.
 * Invoked by convention (*.sitecore.js) when `jss manifest` is run.
 */
export default function addDictionaryToManifest(manifest: Manifest): Promise<void> {
  const startPath = './data/dictionary'; // relative to process invocation (i.e. where package.json lives)

  if (!fileExistsSync(startPath)) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return mergeFs(startPath)
    .then((result) => mergeDictionaryFiles(result, manifest.language))
    .then((mergedDictionary) => convertToManifestDictionary(mergedDictionary))
    .then((dictionary) => manifest.addDictionary(...dictionary));
}

function convertToManifestDictionary(mergedDictionary: { [key: string]: string }) {
  return Object.keys(mergedDictionary).map((key) => ({
    key,
    value: mergedDictionary[key],
    // optional: if you wished to specify the exact ID of a dictionary item when imported,
    // you could pass an 'id' property here that was a GUID or unique (app-wide) string
  }));
}

/**
 * Maps a filesystem dictionary file into an object that represents the dictionary.
 */
function mergeDictionaryFiles(data: MergeFsResult, language: string): { [key: string]: string } {
  let dictionaryResult = {};

  // regex that matches the expected dictionary file name
  const dictionaryFilePattern = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const dictionaryFileData = data.files.find((f) => dictionaryFilePattern.test(f.filename));

  if (dictionaryFileData && dictionaryFileData.contents) {
    // customize here to modify the dictionary or apply conventions
    dictionaryResult = dictionaryFileData.contents;
  }

  return dictionaryResult;
}
