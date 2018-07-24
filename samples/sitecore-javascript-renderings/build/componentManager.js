import path from 'path';
import fs from 'fs';
import { watch } from 'chokidar';
import yaml from 'js-yaml';
import uuid from 'uuid/v1';

export class ComponentManager {
  constructor(
    componentsMap,
    componentServerRenderer,
    renderingDataService,
    { watchFilePaths = [] }
  ) {
    this.components = componentsMap;
    this.componentServerRenderer = componentServerRenderer;
    this.watchFilePaths = watchFilePaths;
    this.watcher = null;
    this.renderingDataService = renderingDataService;
    this.setFileUpdatedCallback = this.setFileUpdatedCallback.bind(this);
  }

  renderAll(language = 'en') {
    let output = '';
    this.components.forEach((component, componentName) => {
      const context = this.renderingDataService.getContext(componentName, language);
      const data = this.renderingDataService.getComponentData(componentName, language);
      if (!data.rendering.uid) {
        // doesn't have to be perfect, but the server renderer needs an id when rendering markup
        data.rendering.uid = uuid();
      }
      const viewBag = this.renderingDataService.getViewBag(componentName, language);
      const renderingData = {
        context,
        ...data,
      };

      const html = this.componentServerRenderer(renderingData, viewBag);
      output += html;
    });
    return output;
  }

  setFileUpdatedCallback(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Provided callback argument was undefined or not a function');
    }

    if (this.watcher && this.watcher.close) {
      this.watcher.close();
    }

    // start a watch on the source files and invoke the callback on any updates
    this.watcher = watch(this.watchFilePaths, {
      ignoreInitial: true,
      cwd: this.rootPath,
    }).on('all', (event, filePath) => {
      console.log(`Component source file ${filePath} changed (${event}), reloading...`);
      try {
        callback();
      } catch (e) {
        console.error(e);
      }
    });
    console.log('Component manager is watching for source file changes...');
  }
}

export class RenderingDataService {
  constructor({ componentDataFolderPath, contextFactory, viewBagFactory }) {
    this.componentDataFolderPath = componentDataFolderPath;
    this.contextFactory = contextFactory;
    this.viewBagFactory = viewBagFactory;

    this.getComponentData = this.getComponentData.bind(this);
    this.getContext = this.getContext.bind(this);
    this.getViewBag = this.getViewBag.bind(this);
  }

  getComponentData(componentName, language = 'en') {
    const dataFolder = path.join(this.componentDataFolderPath, componentName);
    const data = getParsedFileContents(dataFolder, language);
    return data;
  }

  getContext(componentName, language = 'en') {
    if (this.contextFactory) {
      return this.contextFactory(componentName, language);
    }
    return null;
  }

  getViewBag(componentName, language = 'en') {
    if (this.viewBagFactory) {
      return this.viewBagFactory(componentName, language);
    }
    return null;
  }
}

function getParsedFileContents(folderPath, language = 'en') {
  const fileList = fs.readdirSync(folderPath);
  if (!fileList) {
    return null;
  }
  const match = new RegExp(`^${language}\\.(yaml|yml|json)$`, 'i');
  const file = fileList.find((f) => match.test(f));
  if (!file) {
    console.warn(`no data file found in ${folderPath} matching ${language}.(yaml|yml|json)`);
    return null;
  }

  // if no encoding is specified, readFileSync returns a buffer instead of a string
  const fileContents = fs.readFileSync(path.join(folderPath, file), 'utf-8');

  const parsedContents = tryParseJsonOrYaml(fileContents);
  if (parsedContents) {
    return parsedContents;
  }
  return null;
}

function tryParseJsonOrYaml(jsonString) {
  try {
    const json = yaml.safeLoad(jsonString);
    // handle non-exception-throwing cases
    if (json && typeof json === 'object' && json !== null) {
      return json;
    }
  } catch (e) {
    console.error(e);
  }

  return false;
}
