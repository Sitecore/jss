import { mergeFs } from "@sitecore-jss/sitecore-jss-dev-tools";
import path from "path";
import fs from "fs";

// Collects the disconnected content items defined in data/content into the manifest.
// This file may be extended if you wish to store disconnected content data in some way other than the default,
// or to preprocess the content data before it is sent to Sitecore to be ingested.

export default manifest => {
  const rootItemName = "Content";
  const startPath = path.join(process.cwd(), "./data/content"); // relative to process invocation (i.e. where you call `npm run manifest:generate`)

  if (!fs.existsSync(startPath)) {
    console.warn(`No content was defined in ${startPath} for the manifest.`);
    return;
  }

  return mergeFs(startPath)
    .then(result =>
      convertToItems({
        data: result,
        basePath: path.resolve(startPath),
        rootItemName,
        language: manifest.language
      })
    )
    .then(contentData => {
      manifest.addContent(contentData);
    });
};

function convertToItems({ data, basePath, rootItemName, language }) {
  const normalizedRelativePath = data.path
    .replace(basePath, "")
    .replace(/\\/g, "/");

  const itemPath = ensureLeadingCharacter(normalizedRelativePath, "/");
  const name = itemPath.substr(itemPath.lastIndexOf("/") + 1);

  // assume it's a folder if we don't find an item file
  let result = {
    path: itemPath,
    name: name || rootItemName,
    displayName: name || rootItemName,
    template: "Folder",
    children: []
  };

  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, "i");
  const file = data.files.find(f => match.test(f.filename));
  if (file && file.contents) {
    result = file.contents;
    result.path = itemPath;
  }

  if (data.folders.length > 0) {
    result.children = data.folders
      .map(folder => convertToItems({ data: folder, basePath, language }))
      .filter(item => item); // remove null results
  }

  return result;
}

function ensureLeadingCharacter(val, char = "/") {
  if (!val) {
    return char;
  }
  return val.indexOf(char) > 0 ? `${char}${val}` : val;
}
