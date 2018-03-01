import path, { extname } from "path";
import webpack from "webpack";
import fsExtra from "fs-extra";
import yaml from "js-yaml";
import clientConfig from "./webpack.client";
import jssConfig from "../config";
import { writeIndexFile } from "../create-static-index";

/*
  STATIC webpack configuration.
  This configuration creates a build that includes only the
  client bundle but also deploys static assets to the application folder.
*/

export default function(envVars) {
  const config = clientConfig(envVars);

  // deploy static files
  writeIndexFile(config.output.path, config.output.publicPath);

  console.log("Writing static assets /assets/img to output folder...");
  fsExtra.copySync(
    path.resolve(process.cwd(), "./assets/img"),
    `${config.output.path}/assets/img`
  );

  console.log("Writing static data /data to output folder...");
  const dataOutputDir = `${config.output.path}/data`;
  fsExtra.copySync(path.resolve(process.cwd(), "./data"), dataOutputDir);
  yaml2JsonRecursive(dataOutputDir);

  return config;
}

// converts all yaml or yml files in a directory to json files, recursively
function yaml2JsonRecursive(rootPath) {
  const files = fsExtra.readdirSync(rootPath, "utf8");

  files.forEach(fileName => {
    const file = path.join(rootPath, fileName);
    const stat = fsExtra.statSync(file);

    const extName = path.extname(file);
    if (!stat.isDirectory() && /^\.(yml|yaml)/.test(extName)) {
      const finalName =
        file.substring(0, file.length - extName.length) + ".json";

      console.log(`Converting YAML ${file} to ${path.basename(finalName)}...`);

      const yamlData = fsExtra.readFileSync(file, "utf8");
      const yamlObject = yaml.safeLoad(yamlData);
      fsExtra.writeJsonSync(file, yamlObject, { spaces: 2 });
      fsExtra.renameSync(file, finalName);
    }

    if (stat.isDirectory()) yaml2JsonRecursive(file);
  });
}
