import { configLoader } from '@sitecore-jss/sitecore-pipelines';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import { importModules } from '../utils';
import { createManifestInstance } from './manifest';
import { Manifest, ManifestInstance } from './manifest.types';

const processSpecFile = async (moduleWrapper: any, manifest: Manifest) => {
  const module = await moduleWrapper();

  if (!module.default || typeof module.default !== 'function') {
    console.warn('no valid default export defined on module', module);
    return manifest;
  }

  const moduleResult = module.default(manifest);
  // spec files should only return undefined or a promise, we only care about the promise
  if (moduleResult && moduleResult.then) {
    // result is a promise
    // resolve the promise and return the manifest instance so that any non-async spec files
    // after the current file will receive the manifest instance as an argument
    return moduleResult.then(() => manifest);
  }
  return manifest;
};

const processSpecFiles = async ({
  fileGlobs,
  manifestInstance,
}: {
  fileGlobs: string[];
  manifestInstance: Manifest;
}) => {
  const moduleWrappers = importModules({ fileGlobs });

  let manifest = manifestInstance;
  for (const moduleWrapper of moduleWrappers) {
    // eslint-disable-next-line no-await-in-loop
    manifest = await processSpecFile(moduleWrapper, manifest);
  }

  return manifest;
};

const initRequire = (requireArg: string): void => {
  if (!requireArg) {
    return;
  }

  try {
    if (requireArg.startsWith('.')) {
      requireArg = path.join(process.cwd(), requireArg);
    }

    require(requireArg);
  } catch (e) {
    throw new Error(`Unable to load manifest require ${requireArg}: ${e}`);
  }
};

const copyMedia = (mediaPaths: Array<{ src: string }>, outputPath: string) => {
  const seen = new Set();
  return mediaPaths
    .filter((item) => (seen.has(item.src) ? false : seen.add(item.src)))
    .map((mediaPath) => {
      if (!mediaPath.src) {
        console.warn(
          `Media field value ${JSON.stringify(
            mediaPath
          )} did not have an expected 'src' property. Its media item will not be deployed.`
        );
        return { success: false };
      }

      const mediaSourcePath = path.isAbsolute(mediaPath.src) ? `.${mediaPath.src}` : mediaPath.src;

      if (fs.existsSync(mediaSourcePath)) {
        if (!fs.statSync(mediaSourcePath).isFile()) {
          console.warn(
            `Source media path referred to in manifest data is not a file: ${mediaSourcePath}`
          );
          return { success: false };
        }
        const mediaDestinationPath = path.join(path.dirname(outputPath), mediaPath.src);
        const mediaDestinationFolder = path.dirname(mediaDestinationPath);
        fs.ensureDirSync(mediaDestinationFolder);
        fs.copySync(mediaSourcePath, mediaDestinationPath);
        console.log(`copied media from: ${mediaSourcePath} to: ${mediaDestinationPath}`);
        return { source: mediaSourcePath, destination: mediaDestinationPath, success: true };
      }
      // tslint:disable-next-line:no-string-throw
      throw `Source media file referred to in manifest data doesn't exist: ${mediaSourcePath}`;
    });
};

const writeOutput = async ({
  outputPath,
  manifest,
  excludeMedia,
}: {
  outputPath: string;
  manifest: ManifestInstance;
  excludeMedia: boolean;
}) => {
  if (outputPath !== 'console') {
    await fs.ensureFile(outputPath);

    // we copy the media first, because we no longer need the media prop after that
    if (!excludeMedia && manifest.media) {
      copyMedia(manifest.media, outputPath);
    }

    // we remove the media prop as it's unused by the manifest after copying media
    // eslint-disable-next-line no-unused-vars
    const { media, ...finalManifest } = manifest;

    await fs.writeJson(outputPath, finalManifest, { spaces: 2 });

    console.log(chalk.green(`Manifest has been generated and written to ${outputPath}`));

    return finalManifest;
  }

  console.log('manifest', JSON.stringify(manifest, null, 2));

  return manifest;
};

const getPipelineConfig = async ({ patchGlobs }: { patchGlobs: string[] }) => {
  const manifestConfig = await configLoader({
    fileGlobs: ['./pipelines/**/pipeline.config.js'],
    workingDirectory: __dirname,
  });
  const patchedConfig = patchGlobs
    ? await configLoader({
        fileGlobs: patchGlobs,
        existingConfig: manifestConfig,
        allowEmptyGlobs: true,
      })
    : manifestConfig;
  return patchedConfig;
};

export interface GenerateOptions {
  requireArg: string;
  fileGlobs: string[];
  pipelines?: any;
  appName: string;
  excludeItems?: boolean;
  excludeMedia?: boolean;
  excludeDictionary?: boolean;
  outputPath?: string;
  language: string;
  pipelinePatchFileGlobs: string[];
  debug: boolean;
  wipe: boolean;
  rootPlaceholders: string[];
  skipPlaceholderBlacklist: boolean;
}

export interface GenerateToFileOptions extends GenerateOptions {
  outputPath?: string;
  excludeMedia?: boolean;
}

// generates the JSON manifest and returns it as a variable
// NOTE: media is not copied into the manifest when using this method,
// and no files are written to disk. Use generateToFile() to make a manifest
// that is designed to get packaged/imported.
export async function generateToVariable({
  requireArg,
  fileGlobs,
  pipelines,
  appName,
  excludeItems = false,
  excludeDictionary = false,
  language,
  pipelinePatchFileGlobs,
  debug,
  wipe,
  rootPlaceholders,
  skipPlaceholderBlacklist,
}: GenerateOptions): Promise<ManifestInstance> {
  initRequire(requireArg);
  const finalPipelines =
    pipelines || (await getPipelineConfig({ patchGlobs: pipelinePatchFileGlobs }));

  let manifestInstance = createManifestInstance({
    pipelines: finalPipelines,
    appName,
    excludeItems,
    excludeDictionary,
    language,
    debug,
    wipe,
    rootPlaceholders,
    skipPlaceholderBlacklist,
  });

  manifestInstance = await processSpecFiles({ fileGlobs, manifestInstance });

  const manifestOutput = await manifestInstance.getManifest();

  return manifestOutput;
}

// generates a JSON manifest and writes its contents to a directory. Media referenced in the manifest
// is also copied to the directory.
export async function generateToFile({
  outputPath = 'console',
  excludeMedia = false,
  ...generateToVariableOptions
}: GenerateToFileOptions): Promise<ManifestInstance> {
  const manifestOutput = await generateToVariable(generateToVariableOptions);
  return writeOutput({ outputPath, manifest: manifestOutput, excludeMedia });
}
