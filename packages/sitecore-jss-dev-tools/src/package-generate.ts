import { createPackage } from '@sitecore-jss/sitecore-jss-update-package';
import fsExtra from 'fs-extra';
import path from 'path';

export interface PackageGenerateOptions {
  outputPath: string;
  appName: string;
  manifestPath: string;
  manifestFileName: string;
}
export function packageGenerate(options: PackageGenerateOptions) {
  // clear output folder
  fsExtra.emptyDirSync(options.outputPath);

  const datepath = `${new Date().getTime()}`;

  // manifest at temp path, need to save path for adding to metadata
  const manifestRelativePath = path.join('.', 'temp', options.appName, datepath);
  const packageManifestPath = path.join('.', options.outputPath, manifestRelativePath);
  fsExtra.copySync(path.join('.', options.manifestPath), packageManifestPath);

  // generate manifest package
  const updatePackage = path.join(
    options.outputPath,
    `${options.appName}.${datepath}.manifest.zip`
  );

  return new Promise((resolve) => {
    createPackage(packageManifestPath, updatePackage, resolve);
  });
}
