import { generateToFile, generateToVariable, ManifestInstance } from './index';
import { FSWatcher, watch } from 'chokidar';
import { dirname, join } from 'path';

/*
  Manages manifest instance(s) during dev server runs. With this manager:
  * Manifest source files can be watched and a callback triggered on update with a new manifest
  * The manifest can be dynamically regenerated into different source languages at runtime
*/

export interface ManifestManagerOptions {
  rootPath?: string;
  sourceFiles?: string[];
  watchOnlySourceFiles?: string[];
  requireArg?: string | null;
  outputPath?: string;
  pipelinePatchFiles?: string[];
  appName?: string;
}

export class ManifestManager {
  initialManifest = true;
  rootPath: string;
  watcher?: FSWatcher;
  watcherSourcePaths: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manifestArgs: any;

  constructor({
    rootPath = process.cwd(),
    sourceFiles = [
      './sitecore/definitions/**/*.sitecore.js',
      './sitecore/definitions/**/*.sitecore.ts',
    ],
    watchOnlySourceFiles = [],
    requireArg,
    outputPath = './sitecore/manifest/sitecore-import.json',
    pipelinePatchFiles = ['./sitecore/pipelines/**/*.patch.js'],
    appName = 'JssDisconnectedService',
  }: ManifestManagerOptions) {
    if (!requireArg && requireArg !== null) {
      requireArg = './sitecore/definitions/config.js';
    }

    this.manifestArgs = {
      fileGlobs: sourceFiles,
      requireArg,
      appName,
      excludeItems: false,
      excludeMedia: false,
      excludeDictionary: false,
      outputPath,
      language: 'en',
      pipelinePatchFileGlobs: pipelinePatchFiles,
      debug: false,
    };

    this.rootPath = rootPath;

    if (typeof sourceFiles === 'string') {
      // eslint-disable-next-line no-param-reassign
      sourceFiles = [sourceFiles];
    }
    if (typeof watchOnlySourceFiles === 'string') {
      // eslint-disable-next-line no-param-reassign
      watchOnlySourceFiles = [watchOnlySourceFiles];
    }
    if (typeof pipelinePatchFiles === 'string') {
      // eslint-disable-next-line no-param-reassign
      pipelinePatchFiles = [pipelinePatchFiles];
    }

    this.watcherSourcePaths = [...sourceFiles, ...watchOnlySourceFiles, ...pipelinePatchFiles];

    this.getManifest = this.getManifest.bind(this);
    this.getManifestPath = this.getManifestPath.bind(this);
    this.setManifestUpdatedCallback = this.setManifestUpdatedCallback.bind(this);
  }

  setManifestUpdatedCallback(callback: (newManifest: ManifestInstance) => void) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Provided callback argument was undefined or not a function');
    }

    if (this.watcher && this.watcher.close) {
      this.watcher.close();
    }

    // start a watch on the source files and invoke the callback when the manifest is updated
    this.watcher = watch(this.watcherSourcePaths, {
      ignoreInitial: true,
      ignorePermissionErrors: true,
      cwd: this.rootPath,
    })
      .on('all', async (event, path) => {
        console.log(`Manifest source file ${path} changed (${event}), reloading manifest...`);
        try {
          callback(await generateToVariable(this.manifestArgs));
        } catch (e) {
          console.error(e);
        }
      })
      .on('error', (error) => console.error(`Manifest watcher error: ${error}`));

    console.log('Manifest manager is watching for manifest source file changes...');
  }

  getManifestPath() {
    return join(this.rootPath, dirname(this.manifestArgs.outputPath));
  }

  getManifest(language: string) {
    if (language) {
      this.manifestArgs.language = language;
    }

    if (this.initialManifest) {
      // initial manifesting writes to disk, so that we have manifest media
      this.initialManifest = false;
      return generateToFile(this.manifestArgs);
    }

    // subsequent manifestings can be to memory, as the content is only being redone
    return generateToVariable(this.manifestArgs);
  }
}
