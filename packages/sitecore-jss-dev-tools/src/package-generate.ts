import { createPackage } from './update';
import fsExtra from 'fs-extra';
import path from 'path';

export interface PackageGenerateOptions {
  outputPath: string;
  appName: string;
  manifestPath: string;
  manifestFileName: string;
}
/**
 * @param {PackageGenerateOptions} options
 */
export function packageGenerate(options: PackageGenerateOptions) {
  // clear output folder
  fsExtra.emptyDirSync(options.outputPath);

  const datepath = `${new Date().getTime()}`;

  // manifest at temp path, need to save path for adding to metadata
  const manifestTargetRelativePath = path.join('.', 'temp', options.appName, datepath);
  const manifestTargetPath = path.isAbsolute(options.outputPath)
    ? path.join(options.outputPath, manifestTargetRelativePath)
    : path.join('.', options.outputPath, manifestTargetRelativePath);

  const manifestSourcePath = path.isAbsolute(options.manifestPath)
    ? options.manifestPath
    : path.join('.', options.manifestPath);

  fsExtra.copySync(manifestSourcePath, manifestTargetPath);

  // generate manifest package
  const updatePackage = path.join(
    options.outputPath,
    `${options.appName}.${datepath}.manifest.zip`
  );

  return new Promise((resolve) => {
    createPackage(manifestTargetPath, updatePackage, () => resolve(null));
  });
}
